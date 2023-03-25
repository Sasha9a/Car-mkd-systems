import { Injectable } from '@angular/core';
import { WatermarkFormDto } from '@car-mkd-systems/shared/dtos/admin-services/watermark.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService extends BaseService {
  protected override baseUrl = '/admin/service';

  public waterMarks(body: WatermarkFormDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/water-marks`, body, { responseType: 'blob' as any });
  }
}
