import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Movement } from '../../../models/movement';
import { MovementService } from '../../../services/movement.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EleminarmovementComponent } from './eleminarmovement/eleminarmovement.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listarmovement',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,//
    MatFormFieldModule,//
    RouterLink,//
    MatPaginatorModule,//
    MatInputModule,
    MatIconModule,//
    MatSortModule,
    FormsModule,

  ],
  templateUrl: './listarmovement.component.html',
  styleUrl: './listarmovement.component.css'
})
export class ListarmovementComponent implements OnInit{
  //definir las columnas de la tabla
  displayedColumns: string[] = [
    'fecha',
    'tipo',
    'cantidad',
    'numero',
    'editar',
    'eliminar'
  ];

  dataSource: MatTableDataSource<Movement> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private mS: MovementService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  eliminar(id: number) {
    this.dialog.open(EleminarmovementComponent, {width: '250px'}).afterClosed().subscribe((res) => {
      if(res){
    this.mS.eliminar(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    })
  }
  });
  }


}
