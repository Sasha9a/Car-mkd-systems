import { Expose } from 'class-transformer';

@Expose()
export class ModificationDto {
  @Expose()
  public name: string;

  @Expose()
  public price: number;

  @Expose()
  public discount: number;

  @Expose()
  public pricePartner: number;

  @Expose()
  public discountPartner: number;

  @Expose()
  public params: Record<string, string> = {};
}
