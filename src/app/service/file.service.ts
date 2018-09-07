import { Injectable } from '@angular/core';

import { v4 } from 'uuid';
import { FileElement } from '../file-explorer/model/element';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface IFileService {
  add(fileElement: FileElement);
  initiate(fileElement: FileElement[]);
  delete(id: string);
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable()
export class FileService implements IFileService {
  private map = new Map<string, FileElement>();

  constructor() {
    let directory: FileElement[] = [
       {'id':'111','name': 'file1 ', 'type':true, 'parent':'root'},{'id':'222','name': 'File2', 'type':false, 'parent':'root'},{'id':'333','name': 'file inside', 'type':false, 'parent':'111'}

  ];
  console.log(directory);
  this.initiate(directory);  
}
  // [{'id':'111','name': 'file1 ', 'type':true, 'parent':'root'},{'id':'222','name': 'File2', 'type':false, 'parent':'root'},{'id':'333','name': 'file inside', 'type':false, 'parent':'111'}]
  initiate(fileElement: FileElement[]) {
    fileElement.forEach(element => {
      this.add(element);
    });
  }

  add(fileElement: FileElement) {
    console.log(fileElement);
    // fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  delete(id: string) {
    this.map.delete(id);
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string) {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  get(id: string) {
    return this.map.get(id);
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }
}
