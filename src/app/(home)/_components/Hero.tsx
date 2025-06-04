import { ArrowRight, Play, Star, Users, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-default-500 via-default to-default-50">
            <div className="absolute inset-0 z-0">
                <div className="absolute left-10 top-20 animate-bounce text-6xl font-light text-default-300 opacity-10 delay-1000">
                    ∫
                </div>
                <div className="absolute right-20 top-40 animate-pulse text-7xl font-light text-default-400 opacity-15 delay-500">
                    ∑
                </div>
                <div className="absolute bottom-20 left-1/4 animate-bounce text-8xl font-light text-variant-1 opacity-10 delay-700">
                    π
                </div>
                <div className="absolute bottom-40 right-1/3 animate-pulse text-6xl font-light text-default-300 opacity-15 delay-300">
                    √
                </div>
                <div className="absolute left-1/3 top-1/4 animate-bounce text-5xl font-light text-default-400 opacity-10 delay-1200">
                    ∞
                </div>
                <div className="absolute right-1/4 top-1/3 animate-pulse text-7xl font-light text-variant-1 opacity-15 delay-900">
                    θ
                </div>
                <div className="absolute left-1/2 top-1/2 animate-bounce text-4xl font-light text-default-300 opacity-10 delay-600">
                    ∆
                </div>
                <div className="absolute left-20 bottom-1/3 animate-pulse text-5xl font-light text-default-400 opacity-15 delay-400">
                    Σ
                </div>
                <div className="absolute right-10 bottom-20 animate-bounce text-6xl font-light text-variant-1 opacity-10 delay-800">
                    α
                </div>
            </div>

            <div className="absolute inset-0 z-0">

                <div className="absolute left-1/4 top-1/3 h-20 w-20 animate-spin rounded-full border-4 border-variant-1 opacity-20 [animation-duration:20s]"></div>
                <div className="absolute right-1/3 top-1/4 h-16 w-16 animate-spin rounded-full border-4 border-default-400 opacity-20 [animation-duration:15s] [animation-direction:reverse]"></div>
                <div className="absolute bottom-1/4 left-1/3 h-12 w-12 animate-spin rounded-full border-4 border-default-300 opacity-20 [animation-duration:25s]"></div>
            </div>

            <div className="container relative z-10 mx-auto flex min-h-screen items-center px-4">
                <div className="grid w-full items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-2">
                        <div className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-variant-1 to-default-400 px-4 py-2 text-sm font-medium text-white shadow-lg">
                            <Star className="h-4 w-4 fill-current" />
                            <span>Más de 10 usuarios diariamente en nuestra app</span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-default-300 sm:text-5xl md:text-6xl lg:text-7xl">
                            Las matemáticas
                            <span className="block bg-gradient-to-r from-variant-1 to-default-400 bg-clip-text text-transparent">
                                nunca fueron
                            </span>
                            <span className="block">tan fascinantes</span>
                        </h1>

                        <p className="text-lg leading-relaxed text-text-primary sm:text-xl">
                            la matemáticas es la ciencia de la verdad, la ciencia de la belleza, la ciencia de la verdadera belleza.
                            <span className="font-semibold text-variant-1"> desde lo mas simple hasta lo mas complejo</span>
                        </p>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto h-[500px] w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-white to-default p-8 shadow-2xl">
                            <div className="absolute inset-0 opacity-5">
                                <div className="grid h-full w-full grid-cols-8 grid-rows-8">
                                    {Array.from({ length: 64 }).map((_, i) => (
                                        <div key={i} className="border border-default-300">

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-8">
                                <div className="text-center">
                                    <div className="mb-4 text-4xl font-bold text-variant-1 animate-pulse">C = 2πr</div>
                                    <div className="text-sm text-text-secondary">Circunferencia de un circulo</div>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-variant-1 to-transparent"></div>

                                <div className="text-center">
                                    <div className="mb-4 text-3xl font-bold text-default-400 animate-bounce">c = √a² + b²</div>
                                    <div className="text-sm text-text-secondary">Teorema de Pitágoras</div>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-transparent via-default-400 to-transparent"></div>

                                <div className="text-center">
                                    <div className="mb-4 text-3xl font-bold text-default-300 animate-pulse">e^ipi + 1 = 0</div>
                                    <div className="text-sm text-text-secondary">Identidad de Euler</div>
                                </div>
                            </div>

                            <div className="absolute -right-4 -top-4 h-8 w-8 animate-bounce rounded-full bg-variant-1 opacity-20 delay-300"></div>
                            <div className="absolute -bottom-4 -left-4 h-6 w-6 animate-bounce rounded-full bg-default-400 opacity-20 delay-700"></div>
                            <div className="absolute -right-2 bottom-1/3 h-4 w-4 animate-bounce rounded-full bg-default-300 opacity-20 delay-500"></div>
                        </div>

                        <div className="absolute -left-4 top-1/4 animate-bounce rounded-lg bg-white p-3 shadow-lg delay-1000">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-variant-1" />
                                <div>
                                    <div className="text-sm font-semibold text-default-300">los mejores problemas</div>
                                    <div className="text-xs text-text-secondary">Las mejores resoluciones</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 bottom-1/4 animate-bounce rounded-lg bg-white p-3 shadow-lg delay-1500">
                            <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-default-400" />
                                <div>
                                    <div className="text-sm font-semibold text-default-300">Resoluciones</div>
                                    <div className="text-xs text-text-secondary">de los mejores problemas</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

