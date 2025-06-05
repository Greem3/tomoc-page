import pyodbc, os
from pyodbc import Connection, connect, Cursor
from pathlib import Path

config: dict[str, str] = {
    'server': 'localhost',
    'sql_files_path': [
        './Config',
        './Schemas',
        './Audits',
        './Types',
        './Tables',
        './Triggers/Triggers',
        './Views',
        './Store Procedures/AbstractProcedures.sql',
        './Store Procedures/Procedures/*',
        './Inserts',
        './Functions/*',
        './SQL Authentication/Logins.sql',
        './SQL Authentication/Users/*',
        './SQL Authentication/Roles/*'
    ]
}

def execute_sql_files(server: str, sql_files_paths: list[str]):
    
    try:
        
        conn_str: str = (
            'DRIVER={ODBC Driver 17 for SQL Server}',
            f'SERVER={server}',
            f'TrustServerConnection=true'
        )
        
        connection: Connection = connect(conn_str)
        cursor: Cursor = connection.cursor()
        
        for file_path in sql_files_paths:
            
            if file_path.endswith('/*'):
                path_index: int = sql_files_paths.index(file_path)
                
                folder_paths: str = os.listdir(file_path.replace('/*', ''))
                
                sql_files_paths.pop(path_index)
                
                for path in folder_paths:
                    sql_files_paths.insert(path_index, path)
                    path_index += 1
        
        for file_path in sql_files_paths:
            
            try:
                with open(f'{file_path}{'.sql' if not file_path.endswith('.sql') else ''}', 'r', encoding='utf-8') as file:
                    script: str = file.read()
                
                cursor.execute(script)
                cursor.commit()
                
                print(f'File {file_path} executed')
            except Exception as error:
                print(f'Error in {file_path}:\n\n{error}')
    
    except pyodbc.Error as error:
        print(error)
    except Exception as error:
        print(error)

if __name__ == '__main__':
    execute_sql_files(config['server'], config['sql_files_path'])