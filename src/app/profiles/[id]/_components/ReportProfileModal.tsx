"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag, AlertTriangle, CheckCircle } from "lucide-react";

interface ReportProfileModalProps {
  userId: number;
  username: string;
}

const reportReasons = [
  { value: "spam", label: "Spam o contenido no deseado" },
  { value: "harassment", label: "Acoso o intimidación" },
  { value: "inappropriate", label: "Contenido inapropiado" },
  { value: "impersonation", label: "Suplantación de identidad" },
  { value: "fake_profile", label: "Perfil falso" },
  { value: "copyright", label: "Violación de derechos de autor" },
  { value: "other", label: "Otro" },
];

export default function ReportProfileModal({ userId, username }: ReportProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [reportId, setReportId] = useState("");

  const resetModal = () => {
    setReason("");
    setDescription("");
    setErrors({});
    setIsSuccess(false);
    setReportId("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!reason) {
      newErrors.reason = "Debes seleccionar un motivo para el reporte";
    }

    if (reason === "other" && !description.trim()) {
      newErrors.description = "La descripción es obligatoria cuando seleccionas 'Otro'";
    }

    if (description.length > 500) {
      newErrors.description = "La descripción no puede exceder los 500 caracteres";
    }

    if (description.trim().length > 0 && description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres si la proporcionas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Crear el objeto de reporte con información adicional
      const reportData = {
        reportId: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        reportedUserId: userId,
        reportedUsername: username,
        reporterInfo: {
          // En producción esto vendría de la sesión del usuario
          reporterId: 1, // Usuario actual
          reporterUsername: "current_user",
          reporterIP: "xxx.xxx.xxx.xxx", // Se obtendría del servidor
        },
        reason,
        reasonLabel: reportReasons.find(r => r.value === reason)?.label || reason,
        description: description.trim(),
        timestamp: new Date().toISOString(),
        status: "pending",
        priority: ["harassment", "inappropriate", "spam"].includes(reason) ? "high" : "normal",
      };

      // Simular envío al servidor con delay más realista
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log("✅ Reporte enviado exitosamente:", reportData);

      // Simular respuesta del servidor
      const serverResponse = {
        success: true,
        reportId: reportData.reportId,
        estimatedReviewTime: "24-48 horas",
        message: "Tu reporte ha sido recibido y será revisado por nuestro equipo de moderación.",
      };

      // Mostrar pantalla de éxito en lugar de alert
      setReportId(serverResponse.reportId);
      setIsSuccess(true);

    } catch (error) {
      console.error("❌ Error enviando reporte:", error);

      // Mostrar error más elegante
      setErrors({
        submit: "No se pudo enviar el reporte. Por favor verifica tu conexión e intenta de nuevo."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
          title={`Reportar el perfil de @${username} por comportamiento inapropiado`}
        >
          <Flag className="h-4 w-4 mr-2" />
          Reportar Perfil
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        {!isSuccess ? (
          // Formulario de reporte
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Reportar Perfil
              </DialogTitle>
              <DialogDescription>
                ¿Por qué estás reportando el perfil de @{username}? Tu reporte nos ayuda a mantener una comunidad segura.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Motivo del reporte *</Label>
                <Select value={reason} onValueChange={(value) => {
                  setReason(value);
                  if (errors.reason) {
                    setErrors(prev => ({ ...prev, reason: "" }));
                  }
                }} required>
                  <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un motivo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reportReasons.map((reportReason) => (
                      <SelectItem key={reportReason.value} value={reportReason.value}>
                        {reportReason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reason && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.reason}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">
                    Descripción adicional {reason === "other" && <span className="text-red-500">*</span>}
                  </Label>
                  <span className={`text-xs ${description.length > 450 ? 'text-red-500' : description.length > 400 ? 'text-yellow-500' : 'text-gray-500'}`}>
                    {description.length}/500
                  </span>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) {
                      setErrors(prev => ({ ...prev, description: "" }));
                    }
                  }}
                  placeholder={
                    reason === "other"
                      ? "Por favor describe el problema en detalle..."
                      : "Proporciona más detalles sobre el problema (opcional)..."
                  }
                  rows={4}
                  className={`resize-none ${errors.description ? "border-red-500" : ""}`}
                  maxLength={500}
                  required={reason === "other"}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {errors.description}
                  </p>
                )}
                {reason === "other" && !description.trim() && !errors.description && (
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    La descripción es obligatoria cuando seleccionas {'"Otro"'}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.submit}
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Los reportes falsos o maliciosos pueden resultar en acciones contra tu cuenta.
                </p>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    resetModal();
                  }}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <span>Cancelar</span>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !reason || (reason === "other" && !description.trim())}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Enviando reporte...</span>
                    </>
                  ) : (
                    <>
                      <Flag className="h-4 w-4" />
                      <span>Enviar Reporte</span>
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          // Pantalla de éxito
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Reporte Enviado Exitosamente
              </DialogTitle>
              <DialogDescription>
                Tu reporte ha sido recibido y será revisado por nuestro equipo de moderación.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold text-green-800">Reporte Procesado</h3>
                </div>
                <div className="space-y-2 text-sm text-green-700">
                  <p><strong>ID del reporte:</strong> {reportId}</p>
                  <p><strong>Usuario reportado:</strong> @{username}</p>
                  <p><strong>Motivo:</strong> {reportReasons.find(r => r.value === reason)?.label}</p>
                  <p><strong>Tiempo estimado de revisión:</strong> 24-48 horas</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">¿Qué sigue ahora?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Nuestro equipo revisará tu reporte en las próximas 24-48 horas</li>
                  <li>• Si se requiere información adicional, te contactaremos</li>
                  <li>• Te notificaremos cuando se tome una acción</li>
                  <li>• Puedes seguir usando la plataforma normalmente</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Gracias por ayudarnos a mantener una comunidad segura y respetuosa.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  resetModal();
                }}
                className="w-full"
              >
                Cerrar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
