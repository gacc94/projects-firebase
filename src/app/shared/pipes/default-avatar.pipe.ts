import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultAvatar',
  standalone: true
})
export class DefaultAvatarPipe implements PipeTransform {

  transform(value: string | null | undefined, defaultAvatar?: string): string {
    if (!defaultAvatar) defaultAvatar = 'assets/images/avatar.webp';
    return !value || value.trim() === '' ? defaultAvatar : value;
  }

}
