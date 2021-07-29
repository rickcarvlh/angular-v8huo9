import { Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  customerForm: FormGroup;
  ResultData: any[] = [];
  formControls;
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.GetData();
    
  }
  GetData() {
    this.http
      .get<UserSizeItemModel[]>(
        `https://api.tshopmanager.com/api/usersizes/getsizesforuser?userId=` + 2
      )
      .subscribe(result => {
        result.forEach(obj => {
          console.log(obj);
        });
        this.ResultData = result;
        this.formControls = result.map(control => new FormControl(false));
      
        this.createForm();
      });
  }

  createForm() {
    this.customerForm = this.fb.group({
      musicPreferences: new FormArray(this.formControls)
    });
    this.Onchanges()
  }

  Onchanges(){
    this.customerForm.get('musicPreferences').valueChanges.subscribe(
      val=>{
        console.log(val)
      }
    )
  }

 
}

export class UserSizeItemModel {
  id: number;
  surcharge: number;
  UserId: number;
  sizeName: string;
  available: boolean;
  selected: boolean;
}
