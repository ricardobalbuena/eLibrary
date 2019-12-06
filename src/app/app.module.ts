import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Pagina/principal/principal.component';
import { LibraryComponent } from './library/library.component';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { AudioBookComponent } from './audio-book/audio-book.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {path: "Library", component: LibraryComponent},
  {path: "Home", component: PrincipalComponent},
  {path: "Book", component: BookComponent},
  {path: "AudioBook", component: AudioBookComponent},
  {path: "Login", component: LoginComponent},
  {path: "Register", component: RegisterComponent},
  {path: "Usuario", component: UsuarioComponent},
  {path: "**", redirectTo: "Home", pathMatch:"full"}
]
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LibraryComponent,
    BookComponent,
    AudioBookComponent,
    RegisterComponent,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
