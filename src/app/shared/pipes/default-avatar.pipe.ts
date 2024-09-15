import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultAvatar',
  standalone: true
})
export class DefaultAvatarPipe implements PipeTransform {

  transform(value: string | null | undefined, defaultAvatar?: string): string {
    if (!defaultAvatar) {
      defaultAvatar = 'assets/images/avatar.webp';
    }
    // Verifica si el valor es nulo, indefinido o vacío, y si es así, retorna la imagen por defecto.
    return value && value.trim() !== '' ? value : defaultAvatar;
  }

}
