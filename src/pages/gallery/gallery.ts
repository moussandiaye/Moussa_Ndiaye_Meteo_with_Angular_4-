import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map"
import {GalleryService} from "../../service/gallery.service";
import {DetailImagePage} from "../detail-image/detail-image";

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  motCle: string = "";
  images:any = {hits:[]} ;
  size = 4 ;
  currentPage = 1 ;
  page =1 ;
  totalPages : number ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public  galleryService: GalleryService, private  loadCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  onSearch(){
    this.images.hits = [];
    this.doSearch();
  }

  doSearch(){
    let loading =this.loadCtrl.create({
      content: " Chargement en cous..."
    });
    loading.present() ;
    this.galleryService.chercher(this.motCle, this.size, this.currentPage)
      .subscribe(data=> {
        this.totalPages = data.totalHits / this.size ;
        if (this.totalPages % this.size != 0) ++this.totalPages ;
        data.hits.forEach(h => {
          this.images.hits.push(h);
        });
          loading.dismiss();
        },
        error2 => {
        console.log(error2);
          loading.dismiss();
        })
   /* this.http.get("https://pixabay.com/api/?key=8562311-758357ad6b34494a743f4ac26&q="+this.motCLe+"&per_page=30&page=1")
      .map(resp => resp)
      .subscribe(data =>{

        this.images =data ;
      },
        error2 => {
        console.log(error2);
        })*/
  }
  doInfinite(infinite){
    if(this.currentPage < this.totalPages){
      ++this.currentPage ;
      console.log(this.currentPage +"/ "+this.totalPages);
      this.doSearch();
      infinite.complete();
    }

  }
  onDetailImage(im){
    this.navCtrl.push(DetailImagePage, {myImage: im});
  }

}
