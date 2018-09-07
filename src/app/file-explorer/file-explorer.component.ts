import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from './model/element';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/newFolderDialog/newFolderDialog.component';
import { RenameDialogComponent } from './modals/renameDialog/renameDialog.component';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { filedir } from './model/filedir';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent {
  albums : any;
  fileslist : any;
  filePath = {name : '/'};
  
  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {}
  ngOnInit() {
    // const httpOptions = {
    //    headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    //  };
    //  this.http.get('/api/vids/', httpOptions).subscribe(data => {
    //    this.albums = data;
    //    this.fileslist = this.albums.filter(function (el) {
    //      if(el.type === 'd'){
    //        el.type = true;
    //      } else {
    //       el.type = false;
    //      }
    //      console.log(el);
    //      return el ;

    //    });
    //  }, err => {
    //    if (err.status === 401) {
    //      this.router.navigate(['login']);
    //    }
    //  });
    // this.fileslist =[{'name': "File1", 'type': true, 'parent': 'root'},{'name': "File2", 'type': true, 'parent': 'root'},{'name': "File3", 'type': true, 'parent': 'root'}]; 
   }
  
  @Input() fileElements: FileElement[];
  // @Input() files: filedir[];
  @Input() canNavigateUp: string;
  @Input() path: string;
   
  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }
  currentPath = '';

  navigate(element: any) {
    
  //   if (element.type) {
  //     console.log('filePath' + this.filePath.name);
  //     this.filePath.name = this.filePath.name + '/'+ element.name; 
  //     console.log('ConcatinatedfilePath' + this.filePath.name)
  //     const httpOptions = {
  //     headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
  //   };
  //   // const formData = new FormData();
  //   // formData.append('selected', this.selected.so);
  //   let selected = {name: 'defaultname'};
  //   selected.name = element.name;
  //   console.log(this.path);
  //   this.http.post('/api/navigateFolder', this.filePath , httpOptions).subscribe(resp => {
  //     console.log('filePathObjecct' + this.filePath)
  //  this.fileslist = resp;
  //  console.log(resp);
  //   }, err => {
  //   });
    

      
  //   }
  console.log('navigate function' + element.viewChild + element.name);
    this.navigatedDown.emit(element);
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}
