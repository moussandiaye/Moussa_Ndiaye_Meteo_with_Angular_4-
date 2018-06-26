import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class GalleryService{
  public url ="https://pixabay.com/api/?"
  constructor(private  httpClient: HttpClient){

  }
  chercher(query: string, size: number, page: number){
     return this.httpClient.get(this.url+"key=8562311-758357ad6b34494a743f4ac26&q="
      +query+"&per_page="+size+"&page="+page)
      .map(resp => resp);
  }

}
