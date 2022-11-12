import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { data, error } from 'jquery';
import { brand } from 'src/app/shares classes/brands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  page:number=1;
  brands:any;
  copyBrands:any=[];
  productsForm!: FormGroup;
  productsModel: any;
  productsDetails: any;
  showAddBtn: boolean = true;
  showUpdateBtn: boolean = false;
  image: any;
  id: any;
  currentbrand:any;
  actiontext:string="Add Brand"
  constructor(private brandService:BrandsService,private router:ActivatedRoute,private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.brandService.getAllbrands().subscribe((res) => {
      this.brands = res;
      this.copyBrands = res;
    })

    this.getAllbrandDetails();
    this.createbrandForm();
 

}
  search(e: any) {
    console.log(e.keyCode);
    this.copyBrands = [...this.brands];
    if (e.target.value == "") {
       this.ngOnInit();
    }
    else {

      this.copyBrands = this.brands.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(e.target.value.toLocaleLowerCase());
      });
    }
  }

  brandImageUrl = '';
  onSelect(event: any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.brandImageUrl = event.target.result;
        console.log(this.brandImageUrl)
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  /////////////////////////////
  createbrandForm() {
    this.productsForm = this.fb.group({
      Img: [this.brandImageUrl],
      name: [''],

    });
  }
  /////////////////////////
  onAddClick() {
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }
  ////////////////////////////////

  getAllbrandDetails() {
    // this.brandService.getAllbrands().subscribe(res => {
    //   this.productsDetails = res;
    // }, err => {
    //   console.log(err);

    // })
  }
  ////////////////////////////////
  addbrandForm = this.fb.group(
    {
      name: ['', Validators.required],

      Img: [this.brandImageUrl, Validators.required]
    });


  get name() {
    return this.productsForm.get('name');
  }
  get img() {
    return this.productsForm.get('Img');
  }
  //////////////////Add/////////////////
  addbrandDetails() {
    // this.productsModel = Object.assign({}, this.productsForm.value);
    // console.log(this.productsForm.value);

    var bran = new brand(this.productsForm.value.name, this.brandImageUrl);
    this.brandService.Postbrand(bran).subscribe(res => {
      alert("brand Information added successfully");
      let close = document.getElementById('close');
      close?.click();
      this.productsForm.reset();
      this.brandImageUrl='';
      this.getAllbrandDetails();
    }, err => {
      alert("Error");
    })
  }
  ////////////////////FOOORM/////////////////

  //////////////////////////////Delete/////////////////
  deletebrandDetails(id: any) {
    this.brandService.Deletebrand(id).subscribe(res => {
      alert("product information deleted successfully");
      this.getAllbrandDetails();
    }, err => {
      alert("Failed to delete product information");
    })
  }
  ///////////////////Edit///////////////////

  Edit(Brandid:number) {
    this.actiontext="Edit Brand";
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.brandService.getCurrent(Brandid).subscribe((result:any) => {
      
      this.productsForm.controls['name'].setValue(result['name']),
      this. brandImageUrl=result['Img'],
      this.currentbrand=result;

    })
  }
  ////////////update/////////////////////////

  updatebrandDetails(id:any) {
    // this.productsModel = Object.assign({}, this.productsForm.value);
    var bran = new brand(this.productsForm.value.name, this.brandImageUrl);
    this.brandService.Updatebrand(id,bran).subscribe(res => {

      alert("brand information updated successfully");
      let close = document.getElementById('close');
      close?.click();
      this.getAllbrandDetails();
      this.productsForm.reset();
      this.brandImageUrl='';
      this.productsModel = {};
    }, err => {
      alert("Error in updating brand information");
    })
 
}


  reset() {
    this.productsForm.reset();
    this.productsModel = {};
  }
  showConfirmAlert(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.Deletebrand(id)
          .subscribe({
            next: (res) => {
              this.ngOnInit();
            },
            error: () => {
              console.log("Error", error)
            }
          })

        swalWithBootstrapButtons.fire({

          title: 'Deleted!',
          text: "You won't be able to revert this!",
          icon: 'success',
          showConfirmButton: false,
          timer: 1000

        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
