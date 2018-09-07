import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { environment } from '../environments/environment';
import { FileService } from './service/file.service';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, FileExplorerModule, FlexLayoutModule, MatCardModule, AppRoutingModule, FormsModule],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
