import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { PreviewComponent } from './preview/preview.component';
import { PglGEditorComponent } from 'pgl-g-editor';
import { LibPageComponent } from './lib-page/lib-page.component';


const routes: Routes = [
    {
        path: "posts",
        component: EditorComponent
    },
    {
        path: "pages",
        component: EditorComponent
    },
    {
        path: "preview",
        component: PreviewComponent
    },
    {
        path: "pages-lib",
        component: LibPageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
