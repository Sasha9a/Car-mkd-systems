import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TableColumnInterface } from '@car-mkd-systems/web/core/interfaces/table-column.interface';
import { MultiSelectComponent } from '@car-mkd-systems/web/shared/dumbs/dropdowns/multi-select/multi-select.component';
import { OrderByPipe } from '@car-mkd-systems/web/shared/pipes/order-by.pipe';
import { DomHandler } from 'primeng/dom';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule, TableService } from 'primeng/table';
import { ObjectUtils } from 'primeng/utils';

@Component({
  selector: 'car-table',
  standalone: true,
  imports: [CommonModule, TableModule, OrderByPipe, SkeletonModule, ProgressSpinnerModule, MultiSelectComponent],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DomHandler,
    ObjectUtils,
    TableService,
    {
      provide: Table,
      useFactory: (crmTable: TableComponent) => crmTable.table,
      deps: [TableComponent]
    }
  ]
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('table', { static: true }) private table: Table;

  @ContentChild('headerTemplate') public headerTemplate;
  @ContentChild('groupheaderTemplate') public groupheaderTemplate;
  @ContentChild('rowTemplate') public rowTemplate;
  @ContentChild('footerTemplate') public footerTemplate;
  @ContentChild('captionTemplate') public captionTemplate;

  @Input() public loading = false;
  @Input() public paginationLoading = false;

  @Input() public selectable = false;
  @Input() public selectionDisabled = false;
  @Input() public selectedItems: any[] = [];
  @Output() public selectedItemsChange = new EventEmitter<any[]>();

  @Input() public name: string;
  @Input() public values: any[] = [];
  @Input() public columns: TableColumnInterface[] = [];
  public selectedColumns: TableColumnInterface[] = [];
  public selectedColumnsMap: Record<string, boolean>;

  @Input() public filterColumns = false;

  @Input() public sort = '';
  @Output() public sortChange = new EventEmitter<string>();

  @Input() public inplaceSort = true;
  @Input() public styleClass = '';
  @Input() public scrollHeight: string;
  @Input() public scrollable = false;
  @Input() public scrollDirection: string;
  @Input() public responsiveLayout: string;

  @Input() public groupRowsBy: string;
  @Input() public rowGroupMode: string;

  @Input() public autoLayout = false;

  @Input() public skeletonItemsCount = 15;
  public skeletonItems = [];

  public ngOnInit(): void {
    if (!this.sort) {
      this.sort =
        localStorage.getItem(`table.${this.name}.sort`) ??
        this.columns.find((column) => column.sort && column.defaultSort)?.sort ??
        this.columns.find((column) => column.sort)?.sort ??
        '';
    }

    this.skeletonItems = Array(this.skeletonItemsCount).fill(null);

    this.setSelectedColumns();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.columns?.currentValue) {
      this.columns.forEach((element, index) => {
        if (!element.order) {
          element.order = index;
        }
      });

      this.setSelectedColumns();
    }
  }

  public setSelectedColumns() {
    const selectedColumnsNames = localStorage.getItem(`table.${this.name}.columns`);
    if (selectedColumnsNames) {
      this.selectedColumns = this.columns.filter((col) => selectedColumnsNames.includes(col.name));
    } else {
      this.selectedColumns = [...this.columns];
    }
    this.updateSelectedColumnsMap();
  }

  public getSortIconClass(sort: string): string {
    return this.sort.includes(sort) ? (this.sort[0] === '-' ? 'pi pi-sort-down' : 'pi pi-sort-up') : 'pi pi-sort';
  }

  public setSort(sort: string): void {
    this.sort = this.sort === sort ? (sort[0] === '-' ? sort.substring(1) : `-${sort}`) : sort;
    localStorage.setItem(`table.${this.name}.sort`, this.sort);
    if (this.groupRowsBy) {
      this.values = [...this.values];
    }

    this.sortChange.emit(this.sort);
  }

  public updateSelectedColumnsMap() {
    this.selectedColumnsMap = {};
    this.selectedColumns.forEach((col) => (this.selectedColumnsMap[col.name] = true));
  }

  public setFilterColumns(selectedColumns: TableColumnInterface[]) {
    this.updateSelectedColumnsMap();
    localStorage.setItem(`table.${this.name}.columns`, JSON.stringify(selectedColumns.map((col) => col.name)));
  }
}
