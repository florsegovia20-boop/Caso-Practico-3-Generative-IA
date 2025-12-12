import React from 'react';
import { 
  Cloud, 
  Database, 
  Shield, 
  Users, 
  Code, 
  Cpu, 
  Globe, 
  Lock 
} from 'lucide-react';

export const ArchitectureProposal: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Propuesta Técnica: GenMarketing Nexus</h1>
        <p className="text-gray-400">Arquitectura de Alto Nivel y Estrategia de Implementación</p>
      </header>

      {/* 1. Architecture Overview */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-indigo-400 flex items-center gap-2">
          <Cloud size={24} /> 1. Arquitectura del Sistema (Basada en AWS)
        </h2>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-3">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">Frontend (Cliente)</div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2"><Globe size={16} className="text-blue-400"/> React 18 + TypeScript</li>
                <li className="flex gap-2"><Code size={16} className="text-blue-400"/> Tailwind CSS (Estilos)</li>
                <li className="flex gap-2"><Cpu size={16} className="text-blue-400"/> Zustand/Redux (Estado)</li>
                <li className="flex gap-2"><Globe size={16} className="text-blue-400"/> CloudFront (CDN)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">Backend (API)</div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2"><Cpu size={16} className="text-green-400"/> Python FastAPI (Async)</li>
                <li className="flex gap-2"><Cloud size={16} className="text-green-400"/> AWS ECS (Fargate)</li>
                <li className="flex gap-2"><Database size={16} className="text-green-400"/> Redis (Caché/Colas)</li>
                <li className="flex gap-2"><Cpu size={16} className="text-green-400"/> LangChain (Orquestación IA)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-bold text-white mb-2 border-b border-gray-700 pb-2">Datos y Almacenamiento</div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2"><Database size={16} className="text-purple-400"/> PostgreSQL (Datos Usuario)</li>
                <li className="flex gap-2"><Database size={16} className="text-purple-400"/> Pinecone (Vector DB)</li>
                <li className="flex gap-2"><Cloud size={16} className="text-purple-400"/> AWS S3 (Imágenes)</li>
                <li className="flex gap-2"><Shield size={16} className="text-purple-400"/> AWS KMS (Claves Cifrado)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Collaboration & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-400 flex items-center gap-2">
            <Users size={24} /> 2. Colaboración y Flujo de Trabajo
          </h2>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full">
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-blue-500/20 text-blue-400 p-1 rounded">Tiempo Real</span>
                <span>WebSockets (vía AWS API Gateway) para seguimiento de cursores y edición en vivo.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-green-500/20 text-green-400 p-1 rounded">Versionado</span>
                <span>Patrón Event Sourcing. Cada edición es un delta almacenado en Postgres. Permite deshacer/rehacer infinito y auditoría.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-yellow-500/20 text-yellow-400 p-1 rounded">Roles</span>
                <span>RBAC (Control de Acceso Basado en Roles).
                  <br/><span className="text-xs text-gray-500">• Diseñador: Lectura/Escritura Imágenes</span>
                  <br/><span className="text-xs text-gray-500">• Redactor: Lectura/Escritura Texto</span>
                  <br/><span className="text-xs text-gray-500">• Aprobador: Aprobar/Rechazar flujos</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-400 flex items-center gap-2">
            <Lock size={24} /> 3. Seguridad y Ética
          </h2>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full">
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-red-500/20 text-red-400 p-1 rounded">Cifrado</span>
                <span>AES-256 para datos en reposo. TLS 1.3 para datos en tránsito. Cifrado de extremo a extremo para espacios privados.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-purple-500/20 text-purple-400 p-1 rounded">Moderación</span>
                <span>Verificaciones automáticas pre-vuelo usando Gemini Safety Settings y modelos de moderación especializados (AWS Rekognition).</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-gray-500/20 text-gray-400 p-1 rounded">Cumplimiento</span>
                <span>Marcas de agua (SynthID) para todas las imágenes generadas por IA para garantizar transparencia.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* 4. Roadmap */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-indigo-400 flex items-center gap-2">
          <Code size={24} /> 4. Roadmap de Desarrollo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { phase: "Fase 1: MVP", time: "Mes 1-2", items: ["UI Core React", "Integración API Gemini", "Auth Básico", "Almacenamiento S3"] },
            { phase: "Fase 2: Collab", time: "Mes 3-4", items: ["WebSockets", "Cursores en Vivo", "Sistema de Comentarios", "Flujos de Aprobación"] },
            { phase: "Fase 3: Escala", time: "Mes 5-6", items: ["Búsqueda Vectorial", "Modelos Personalizados (Fine-tuning)", "Panel de Analíticas"] },
            { phase: "Fase 4: Empresa", time: "Mes 7+", items: ["SSO/SAML", "Logs de Auditoría", "Soporte SLA", "App Móvil"] }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-800 p-5 rounded-lg border border-gray-700 relative overflow-hidden group hover:border-indigo-500 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 group-hover:opacity-100"></div>
              <h3 className="font-bold text-white mb-1">{item.phase}</h3>
              <p className="text-xs text-gray-500 mb-3">{item.time}</p>
              <ul className="text-sm text-gray-400 space-y-1">
                {item.items.map((li, i) => <li key={i}>• {li}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};