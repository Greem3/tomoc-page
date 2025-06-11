import { Calculator, BookOpen, Award, Users, Brain, LineChart, LucideIcon } from "lucide-react"
import featuresData from "@/data/features.json"

type IconComponents = {
    [key: string]: LucideIcon;
}

export default function Feature() {
    const iconComponents: IconComponents = {
        Calculator,
        BookOpen,
        Award,
        Users,
        Brain,
        LineChart
    }


    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-default-300 sm:text-4xl">¿Por qué entrenar con nosotros?</h2>
                    <p className="mx-auto max-w-2xl text-default-300">
                        Ofrecemos la preparación más completa para olimpiadas matemáticas, desde nivel nacional hasta competencias
                        internacionales como la IMO.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featuresData.features.map((feature, index) => {
                        const IconComponent = iconComponents[feature.iconName]
                        return (
                            <div key={index} className="flex flex-col items-center space-y-4 rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:scale-105">
                                {IconComponent && <IconComponent className="h-10 w-10" />}
                                <h3 className="text-xl font-semibold text-default-300">{feature.title}</h3>
                                <p className="text-text-secondary">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
