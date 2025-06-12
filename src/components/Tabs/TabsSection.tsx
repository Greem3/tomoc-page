import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITabsSectionProps } from "./TabsSectionTypes";



export default function TabsSection({ tabs, customDefaultValue, tabsListProps, allTabsContentClassName, ...props}: ITabsSectionProps) {

    // Save all name of the tabs
    const tabsKeys = Object.keys(tabs)

    return (
        <Tabs
            defaultValue={customDefaultValue ?? tabsKeys[0].toLowerCase().trim()}
            {...props}
        >

            <TabsList className={tabsListProps?.className} {...tabsListProps}>

                {/* Iterates through each key in the list, and creates a TabTrigger with the value at that index. */}
                {tabsKeys.map((tab, index) => <TabsTrigger
                    value={tab.toLowerCase().trim()}
                    key={index}
                    {...tabs[tab].tabTriggerProp}
                >
                    {tab}
                </TabsTrigger>)}

            </TabsList>
            
            {/* Iterate through each key in the list and get the values ​​of the object stored in the key */}
            {tabsKeys.map((tab: string, index) => <TabsContent
                value={tab.toLowerCase().trim()}
                key={index}
                className={`${allTabsContentClassName} ${tabs[tab].props?.className}`}
                {...tabs[tab].props}
            >

                {tabs[tab].content}

            </TabsContent>)}
        </Tabs>
    )
}