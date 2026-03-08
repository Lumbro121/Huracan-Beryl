
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { berylTrackData } from "@/components/HurricaneMap";

const HurricaneMap = dynamic(() => import("@/components/HurricaneMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-900 rounded-lg flex items-center justify-center">
      <div className="text-white animate-pulse">Cargando mapa interactivo...</div>
    </div>
  ),
});

const huracanesHistoricos = [
  {
    nombre: "Gran Huracán de Galveston",
    año: 1900,
    categoria: 4,
    muertes: "8,000 - 12,000",
    ubicacion: "Texas, EE.UU.",
    descripcion: "El desastre natural más mortal en la historia de Estados Unidos. Devastó completamente la ciudad de Galveston con una marejada ciclónica de más de 4 metros.",
    vientos: 233,
    presion: 936,
  },
  {
    nombre: "Huracán Mitch",
    año: 1998,
    categoria: 5,
    muertes: "11,000+",
    ubicacion: "Centroamérica",
    descripcion: "Uno de los huracanes más mortíferos del Atlántico. Causó devastadoras inundaciones y deslizamientos en Honduras, Nicaragua, Guatemala y El Salvador.",
    vientos: 290,
    presion: 905,
  },
  {
    nombre: "Huracán Katrina",
    año: 2005,
    categoria: 5,
    muertes: "1,836",
    ubicacion: "Luisiana, EE.UU.",
    descripcion: "Uno de los huracanes más costosos de la historia. Destruyó Nueva Orleans cuando los diques fallaron, causando inundaciones catastróficas.",
    vientos: 280,
    presion: 902,
  },
  {
    nombre: "Huracán María",
    año: 2017,
    categoria: 5,
    muertes: "2,975",
    ubicacion: "Puerto Rico, Dominica",
    descripcion: "Devastó Puerto Rico causando un apagón masivo que duró meses. El huracán más mortal en la historia de Puerto Rico desde 1899.",
    vientos: 280,
    presion: 908,
  },
  {
    nombre: "Tifón Haiyan (Yolanda)",
    año: 2013,
    categoria: 5,
    muertes: "6,300+",
    ubicacion: "Filipinas",
    descripcion: "Uno de los ciclones tropicales más intensos jamás registrados. Generó una marejada ciclónica de 7 metros que arrasó comunidades costeras.",
    vientos: 315,
    presion: 895,
  },
  {
    nombre: "Ciclón Bhola",
    año: 1970,
    categoria: 3,
    muertes: "300,000 - 500,000",
    ubicacion: "Bangladesh (Pakistán Oriental)",
    descripcion: "El ciclón tropical más mortal de la historia registrada. La marejada ciclónica de hasta 10 metros arrasó las islas bajas del delta del Ganges.",
    vientos: 185,
    presion: 966,
  },
  {
    nombre: "Huracán Dorian",
    año: 2019,
    categoria: 5,
    muertes: "84",
    ubicacion: "Bahamas",
    descripcion: "El huracán más intenso registrado en el Atlántico abierto. Permaneció estacionario sobre Gran Bahama durante casi 2 días causando destrucción catastrófica.",
    vientos: 295,
    presion: 910,
  },
  {
    nombre: "Huracán Patricia",
    año: 2015,
    categoria: 5,
    muertes: "19",
    ubicacion: "México",
    descripcion: "El huracán más intenso jamás registrado en el Hemisferio Occidental. Alcanzó vientos sostenidos de 345 km/h con una intensificación récord.",
    vientos: 345,
    presion: 872,
  },
];

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<typeof berylTrackData[0] | null>(null);

  const getCategoryColor = (cat: number) => {
    switch (cat) {
      case 5: return "bg-red-600";
      case 4: return "bg-orange-600";
      case 3: return "bg-amber-600";
      case 2: return "bg-yellow-500";
      case 1: return "bg-lime-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/hurricane-earth-from-space_23-2151995202.jpg?semt=ais_hybrid&w=740&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <Badge className="mb-4 bg-red-600/20 text-red-400 border-red-600/50 px-4 py-1 text-sm font-semibold tracking-widest">
            FENÓMENOS EXTREMOS
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Huracán <span className="text-red-500">Beryl</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            El primer huracán categoría 5 registrado en el Atlántico en el mes de junio. 
            Explora su trayectoria y descubre los huracanes más devastadores de la historia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Interactive Map Section */}
        <section>
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <CardTitle className="text-2xl text-white">Trayectoria del Huracán Beryl</CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Haz clic en los puntos del mapa para ver la información de latitud, longitud y categoría en cada posición
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="lg:col-span-2 p-4">
                  <HurricaneMap 
                    onPointSelect={setSelectedPoint} 
                    selectedPoint={selectedPoint}
                  />
                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap gap-3 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#00BFFF]" />
                      <span className="text-xs text-slate-400">Depresión</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#00FF00]" />
                      <span className="text-xs text-slate-400">Tormenta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FFFF00]" />
                      <span className="text-xs text-slate-400">Cat. 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                      <span className="text-xs text-slate-400">Cat. 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FFA500]" />
                      <span className="text-xs text-slate-400">Cat. 3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF4500]" />
                      <span className="text-xs text-slate-400">Cat. 4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF0000]" />
                      <span className="text-xs text-slate-400">Cat. 5</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950/50 border-l border-slate-800 p-4">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Información del Punto
                  </h3>
                  {selectedPoint ? (
                    <div className="space-y-4">
                      <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Fecha y Hora</p>
                          <p className="text-white font-semibold">{selectedPoint.date}</p>
                          <p className="text-slate-400 text-sm">{selectedPoint.time}</p>
                        </div>
                        <Separator className="bg-slate-700" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Latitud</p>
                            <p className="text-xl font-mono text-emerald-400">{selectedPoint.lat.toFixed(1)}°N</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Longitud</p>
                            <p className="text-xl font-mono text-cyan-400">{Math.abs(selectedPoint.lon).toFixed(1)}°W</p>
                          </div>
                        </div>
                        <Separator className="bg-slate-700" />
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Categoría</p>
                          <Badge className={`mt-1 ${
                            selectedPoint.category.includes("Cat. 5") ? "bg-red-600" :
                            selectedPoint.category.includes("Cat. 4") ? "bg-orange-600" :
                            selectedPoint.category.includes("Cat. 3") ? "bg-amber-600" :
                            selectedPoint.category.includes("Cat. 2") ? "bg-yellow-500 text-black" :
                            selectedPoint.category.includes("Cat. 1") ? "bg-lime-500 text-black" :
                            "bg-green-600"
                          }`}>
                            {selectedPoint.category}
                          </Badge>
                        </div>
                        <Separator className="bg-slate-700" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Vientos</p>
                            <p className="text-lg font-bold text-white">{selectedPoint.wind} <span className="text-sm text-slate-400">kt</span></p>
                            <p className="text-xs text-slate-500">{Math.round(selectedPoint.wind * 1.852)} km/h</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Presión</p>
                            <p className="text-lg font-bold text-white">{selectedPoint.pressure} <span className="text-sm text-slate-400">mb</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <p className="text-sm">Haz clic en un punto del mapa para ver sus coordenadas</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Track Data Table */}
        <section>
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">Datos Completos de la Trayectoria</CardTitle>
              <CardDescription className="text-slate-400">
                Registro histórico de posiciones del Huracán Beryl (28 junio - 9 julio 2024)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] rounded-lg border border-slate-800">
                <table className="w-full">
                  <thead className="bg-slate-800/50 sticky top-0">
                    <tr>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Fecha</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Hora (UTC)</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Latitud</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Longitud</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Categoría</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Vientos</th>
                      <th className="text-left text-xs text-slate-400 p-3 font-semibold">Presión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {berylTrackData.map((point, index) => (
                      <tr 
                        key={`${point.date}-${point.time}`}
                        className={`border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer transition-colors ${
                          selectedPoint === point ? "bg-slate-800/50" : ""
                        }`}
                        onClick={() => setSelectedPoint(point)}
                      >
                        <td className="p-3 text-sm text-white">{point.date}</td>
                        <td className="p-3 text-sm text-slate-400">{point.time}</td>
                        <td className="p-3 text-sm font-mono text-emerald-400">{point.lat.toFixed(1)}°N</td>
                        <td className="p-3 text-sm font-mono text-cyan-400">{Math.abs(point.lon).toFixed(1)}°W</td>
                        <td className="p-3">
                          <Badge variant="outline" className={`text-xs ${
                            point.category.includes("Cat. 5") ? "border-red-500 text-red-400" :
                            point.category.includes("Cat. 4") ? "border-orange-500 text-orange-400" :
                            point.category.includes("Cat. 3") ? "border-amber-500 text-amber-400" :
                            point.category.includes("Cat. 2") ? "border-yellow-500 text-yellow-400" :
                            point.category.includes("Cat. 1") ? "border-lime-500 text-lime-400" :
                            "border-green-500 text-green-400"
                          }`}>
                            {point.category}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-white">{point.wind} kt</td>
                        <td className="p-3 text-sm text-white">{point.pressure} mb</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Section */}
        <Tabs defaultValue="historicos" className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800 p-1 w-full md:w-auto">
            <TabsTrigger value="historicos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Huracanes Históricos
            </TabsTrigger>
            <TabsTrigger value="beryl" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Sobre Beryl
            </TabsTrigger>
            <TabsTrigger value="ciencia" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Ciencia
            </TabsTrigger>
          </TabsList>

          {/* Historic Hurricanes Tab */}
          <TabsContent value="historicos">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Los Huracanes Más Feroces del Mundo</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  A lo largo de la historia, estos ciclones tropicales han dejado una huella imborrable 
                  de destrucción y han cambiado comunidades para siempre.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {huracanesHistoricos.map((huracan, index) => (
                  <Card 
                    key={huracan.nombre} 
                    className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-all duration-300 group overflow-hidden"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-white group-hover:text-red-400 transition-colors">
                            {huracan.nombre}
                          </CardTitle>
                          <CardDescription className="text-slate-400">
                            {huracan.ubicacion} • {huracan.año}
                          </CardDescription>
                        </div>
                        <Badge className={`${getCategoryColor(huracan.categoria)} text-white shrink-0`}>
                          Categoría {huracan.categoria}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-slate-300 leading-relaxed">{huracan.descripcion}</p>
                      <Separator className="bg-slate-800" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-red-500">{huracan.muertes}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">Víctimas</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-500">{huracan.vientos}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">km/h</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-cyan-500">{huracan.presion}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">mb</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Beryl Info Tab */}
          <TabsContent value="beryl">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Huracán Beryl - Temporada 2024
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    El <strong className="text-white">Huracán Beryl</strong> fue un ciclón tropical extremadamente 
                    poderoso que estableció múltiples récords históricos durante la temporada de huracanes 2024 
                    en el Atlántico. Se formó el 28 de junio y se disipó el 9 de julio.
                  </p>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Récords Establecidos:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        </span>
                        <p className="text-slate-300">
                          <strong className="text-white">Primer huracán categoría 5</strong> registrado en el 
                          Atlántico en el mes de junio en toda la historia.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        </span>
                        <p className="text-slate-300">
                          <strong className="text-white">Intensificación rápida sin precedentes</strong> - 
                          Pasó de tormenta tropical a huracán mayor en menos de 24 horas.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        </span>
                        <p className="text-slate-300">
                          <strong className="text-white">Formación más temprana</strong> de un huracán mayor 
                          (categoría 3+) en el Atlántico tropical.
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Impacto y Trayectoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-red-500">165</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">kt máximos</p>
                      <p className="text-sm text-slate-400 mt-1">~305 km/h</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-cyan-500">932</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">mb mínima</p>
                      <p className="text-sm text-slate-400 mt-1">Presión central</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Regiones Afectadas:</h4>
                    <div className="space-y-2">
                      {[
                        { region: "Islas de Barlovento", descripcion: "Impacto directo en Granada, San Vicente" },
                        { region: "Jamaica", descripcion: "Pasó cerca de la costa sur" },
                        { region: "Península de Yucatán", descripcion: "Afectó costas de México" },
                        { region: "Texas, EE.UU.", descripcion: "Tocó tierra cerca de Matagorda" },
                      ].map((lugar) => (
                        <div key={lugar.region} className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full" />
                          <div>
                            <p className="text-white font-medium">{lugar.region}</p>
                            <p className="text-xs text-slate-400">{lugar.descripcion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Science Tab */}
          <TabsContent value="ciencia">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">¿Cómo se forman?</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 text-sm space-y-3">
                  <p>
                    Los huracanes se forman sobre aguas oceánicas cálidas (al menos 26°C) cerca del ecuador. 
                    El aire cálido y húmedo asciende, creando un área de baja presión. El aire circundante 
                    gira debido al efecto Coriolis.
                  </p>
                  <p>
                    La energía proviene de la evaporación del agua oceánica. Cuando el vapor de agua se 
                    condensa en nubes, libera calor latente que impulsa aún más la circulación.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Escala Saffir-Simpson</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { cat: 1, vientos: "119-153 km/h", daño: "Mínimo" },
                    { cat: 2, vientos: "154-177 km/h", daño: "Moderado" },
                    { cat: 3, vientos: "178-208 km/h", daño: "Extenso" },
                    { cat: 4, vientos: "209-251 km/h", daño: "Extremo" },
                    { cat: 5, vientos: ">252 km/h", daño: "Catastrófico" },
                  ].map((item) => (
                    <div key={item.cat} className="flex items-center gap-3 text-sm">
                      <Badge className={`${getCategoryColor(item.cat)} text-white w-16 justify-center`}>
                        Cat. {item.cat}
                      </Badge>
                      <span className="text-slate-400 flex-1">{item.vientos}</span>
                      <span className="text-slate-500 text-xs">{item.daño}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Cambio Climático</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 text-sm space-y-3">
                  <p>
                    Los científicos han observado que los huracanes se están intensificando más rápidamente 
                    debido al calentamiento de los océanos. La temporada 2024 con Beryl es un ejemplo claro.
                  </p>
                  <p>
                    El aumento de la temperatura superficial del mar proporciona más energía a estos sistemas, 
                    permitiendo que alcancen categorías más altas en menos tiempo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              Datos meteorológicos basados en información del National Hurricane Center (NHC)
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Mapa:</span>
              <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                OpenStreetMap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
