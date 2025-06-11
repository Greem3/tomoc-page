"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface EditProfileModalProps {
  userId: number;
  initialData: {
    fullname: string;
    username: string;
    country: string;
    bio?: string;
  };
}

export default function EditProfileModal({ userId, initialData }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: initialData.fullname,
    username: initialData.username,
    country: initialData.country,
    bio: initialData.bio || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validar nombre completo
    if (!formData.fullname.trim()) {
      newErrors.fullname = "El nombre completo es obligatorio";
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = "El nombre debe tener al menos 2 caracteres";
    } else if (formData.fullname.trim().length > 100) {
      newErrors.fullname = "El nombre no puede exceder los 100 caracteres";
    }

    // Validar username
    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    } else if (formData.username.trim().length > 30) {
      newErrors.username = "El nombre de usuario no puede exceder los 30 caracteres";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      newErrors.username = "Solo se permiten letras, números y guiones bajos";
    }

    // Validar país
    if (!formData.country.trim()) {
      newErrors.country = "El país es obligatorio";
    } else if (formData.country.trim().length > 50) {
      newErrors.country = "El nombre del país no puede exceder los 50 caracteres";
    }

    // Validar biografía (opcional)
    if (formData.bio.length > 500) {
      newErrors.bio = "La biografía no puede exceder los 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetModal = () => {
    setFormData({
      fullname: initialData.fullname,
      username: initialData.username,
      country: initialData.country,
      bio: initialData.bio || "",
    });
    setErrors({});
    setIsSuccess(false);
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular verificación de username único
      await new Promise(resolve => setTimeout(resolve, 500));

      // Aquí iría la lógica para actualizar el perfil en la base de datos
      const updatedProfile = {
        userId,
        fullname: formData.fullname.trim(),
        username: formData.username.trim().toLowerCase(),
        country: formData.country.trim(),
        bio: formData.bio.trim(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Actualizando perfil:", updatedProfile);

      // Simular la actualización en el servidor
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostrar pantalla de éxito
      setIsSuccess(true);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setErrors({ submit: "Error al actualizar el perfil. Por favor intenta de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    // Resetear el modal después de un pequeño delay para permitir la animación de cierre
    setTimeout(() => {
      resetModal();
    }, 200);
  };

  const handleSuccessClose = () => {
    handleCloseModal();
    // En producción, aquí podrías actualizar el estado global o hacer refetch de datos
    window.location.reload();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors">
          <Edit2 className="h-4 w-4 mr-2" />
          Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isSuccess ? (
          // Pantalla de éxito
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ¡Perfil actualizado correctamente!
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Los cambios en tu perfil se han guardado exitosamente y se reflejarán en breve.
            </p>

            <Button
              onClick={handleSuccessClose}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            >
              Continuar
            </Button>
          </div>
        ) : (
          // Formulario principal
          <>
            <DialogHeader>
              <DialogTitle>Editar Perfil</DialogTitle>
              <DialogDescription>
                Actualiza tu información de perfil. Los cambios se guardarán automáticamente.
              </DialogDescription>
            </DialogHeader>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error al actualizar</p>
                  <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm font-medium">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`w-full ${errors.fullname ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Tu nombre completo"
                  maxLength={100}
                />
                {errors.fullname && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullname}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.fullname.length}/100 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Nombre de usuario <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full ${errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="nombre_usuario"
                  maxLength={30}
                />
                {errors.username && (
                  <p className="text-xs text-red-600 mt-1">{errors.username}</p>
                )}
                <p className="text-xs text-gray-500">
                  Solo letras, números y guiones bajos. {formData.username.length}/30 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  País <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full ${errors.country ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Tu país"
                  maxLength={50}
                />
                {errors.country && (
                  <p className="text-xs text-red-600 mt-1">{errors.country}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.country.length}/50 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Biografía <span className="text-gray-400">(opcional)</span>
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={`w-full resize-none ${errors.bio ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Cuéntanos un poco sobre ti..."
                  rows={3}
                  maxLength={500}
                />
                {errors.bio && (
                  <p className="text-xs text-red-600 mt-1">{errors.bio}</p>
                )}
                <p className={`text-xs ${formData.bio.length > 450 ? 'text-orange-600' : formData.bio.length > 400 ? 'text-yellow-600' : 'text-gray-500'}`}>
                  {formData.bio.length}/500 caracteres
                </p>
              </div>

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  className="hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
