# Background

## Por qué el background? {#Why}

El background se creó para que se hagan consultas en la DB aparte del programa y guarda
los datos recopilados en un JSON, asi mejorando la efectividad del programa

## Cómo usar el background {#HowUse}

El background tiene 2 clases importantes:

- Task
- TaskManager

### Task {#Tasj}

Task simplemente guarda la información de funciones asíncronicas.


A las Tasks puedes pasarles funciones asincronicas como primer parametro, y en el caso de que tengan
parametros, también se los puedes pasar mediante el constructor de la clase (en el 2do parametro)
Y finalmente, en el caso de que tu funcion asíncronica no tenga nombre (como puede ser una función anónima)
Puedes pasarle el nombre de la función al final, esto te servira para saber que función cometió un error.

### TaskManager {#TaskManager}

TaskManager es el manejador de tareas, si ocurre algún error, este te dira en cual tarea fue que sucedió, y donde sucedió.
TaskManager te permite enviarle **varias** tareas al mismo tiempo (sin importar si son Task o funciones asíncronicas normales)
y las ejecutara de manera **paralela** cada una. También, TaskManager te permite ejecutar tareas de manera **repetitiva** cada cierto tiempo que elijas
(Por ejemplo, cada 30 segundos)

TaskManager maneja las tareas en 2 tipos niveles:

- Tareas de mismo nivel (executeSameLevelTasks)
- Tareas de distinto nivel (executeDistinctLevelTasks)

#### Tareas de mismo nivel

Estas tareas se ejecutan denuevo cada cierto tiempo. Pero antes todas tienen que terminar su ejecución

Ejemplo:

```js

const taskManager = new TaskManager();

taskManager.executeSameLevelTasks([
    funcion1,
    funcion2,
    funcion3,
    funcion4
], 10000) // 10 segundos
```

Cuando se terminen de ejecutar las 4 tareas, la función esperara a que pasen 10 segundos para ejecutarlas todas denuevo.


**¿Por qué y cuando usar este tipo de nivel de tareas?**

Este tipo de tareas es útil cuando necesitas que varias tareas se ejecuten cada X tiempo pero
necesitas que estás esperen a las demás por alguna razón

*Extra:*

Por temas de código, se implementó que cuando cada función se haya ejecutado al menos una vez
la función se cuente como terminó (pero realmente se sigue ejecutando de fondo) para que se
le pueda hacer await a la funcion executeDistinctLevelTasks

#### Tareas de distinto nivel

Estas tareas se ejecutan denuevo cada cierto. Pero a diferencia de las tareas de distinto nivel
estas tienen el mismo tiempo de volverse a ejecutar, pero no esperan a que terminen las demas

Ejemplo:

```js

const taskManager = new TaskManager()

taskManager.executeDistinctLevelTasks([
    funcion1,
    funcion2,
    funcion3,
    funcion4
], 20000) // 20 segundos
```

Si la funcion1 **termina** su ejecución, **no importa** si las otras funciones **terminaron** su trabajo,
esta **volvera** a ejecutarse luego de 20 segundos, y asi mismo las demás.

**¿Por qué y cuando usar este tipo de nivel de tareas?**

Este tipo de nivel de tareas es útil cuando tienes varias tareas que se ejecutaran cada X tiempo pero
que no necesitas que se esperen entre si, ahorrandote unas líneas de código y simplificando su lectura.

*Extra:*

Por temas de código, se implementó que cuando cada función se haya ejecutado al menos una vez
la función se cuente como terminó (pero realmente se sigue ejecutando de fondo) para que se
le pueda hacer await a la funcion executeDistinctLevelTasks