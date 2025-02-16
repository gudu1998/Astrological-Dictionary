import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// @ts-ignore
import * as ClassicEditor from 'src/assets/ckeditor/ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'zodiac-sign',
  templateUrl: './zodiac-sign.component.html',
  styleUrls: ['./zodiac-sign.component.scss']
})
export class ZodiacSignComponent implements OnInit {
  constructor(
      private _adminService: AdminService,
      private modalService: BsModalService,
      private fb: FormBuilder,
      private toastr: ToastrService
    ) {}

    Editor = ClassicEditor;
    data: any[] = [];
    dreamConfig = {
      keyboard: false,
      class: 'modal-xl',
    };
    deleteConfig = {
      keyboard: false,
      class: 'modal-md',
    };
    modalRef!: BsModalRef;
    editorConfig = {
      toolbar: ['bold', 'italic', 'underline'],
      contentsCss: ['assets/ckeditor/ckeditor.scss'],
      placeholder: 'Enter your description here...',
    };
    zodiacSignForm!: FormGroup;
    filteredData = [...this.data];

    ngOnInit() {
      this.zodiacSignForm = this.fb.group({
        title: ['', Validators.required],
        desc: ['', [Validators.required]],
      });
      this.fetchZodiacSign();
    }

    fetchZodiacSign() {
      this._adminService.fetchZodiacSign().subscribe({
        next: (response) => {
          this.data = response;
          this.filteredData = [...this.data];
        },
        error: () => {
          this.toastr.error(
            'Some error occured while fetching Zodiac Sign.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
    }

    onSearchChange(event: any) {
      if (!event.target.value) {
        this.filteredData = [...this.data];
        return;
      }

      const lowerSearch = event.target.value.toLowerCase();
      this.filteredData = this.data.filter((row: any) =>
        Object.values(row).some((value: any) =>
          value.toString().toLowerCase().includes(lowerSearch)
        )
      );
    }

    openEditZodiacSignModal(
      template: TemplateRef<any>,
      termId: string
    ): void {
      this.modalRef = this.modalService.show(template, this.dreamConfig);
      this.fetchZodiacSignById(termId);
    }

    fetchZodiacSignById(termId: string) {
      this._adminService.fetchZodiacSignById(termId).subscribe({
        next: (response: any) => {
          this.zodiacSignForm.get('title')?.setValue(response.name);
          this.zodiacSignForm.get('desc')?.setValue(response.desc);
        },
        error: () => {
          this.toastr.error(
            'Some error occured while fetching Zodiac Sign.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
    }

    closeModal(): void {
      this.modalRef.hide();
    }

    addZodiac(template: TemplateRef<any>) {
      this.zodiacSignForm.reset();
      this.modalRef = this.modalService.show(template, this.dreamConfig);
    }

    deleteZodiac(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, this.deleteConfig);
    }

    saveZodiacSign() {
      this.zodiacSignForm.markAllAsTouched();
      if(this.zodiacSignForm.valid) {
      let body = {
        title: this.zodiacSignForm.get('title')?.value,
        desc: this.zodiacSignForm.get('desc')?.value,
      };
      this._adminService.addZodiacSign(body).subscribe({
        next: () => {
          this.toastr.success(
            'Zodiac Sign had been added successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );

          this.fetchZodiacSign();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while adding Zodiac Sign.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
    }
    }

    saveEditedZodiacSign(termId: string) {
      this.zodiacSignForm.markAllAsTouched();
      if(this.zodiacSignForm.valid) {
      let body = {
        title: this.zodiacSignForm.get('title')?.value,
        desc: this.zodiacSignForm.get('desc')?.value,
      };
      this._adminService.editZodiacSign(termId, body).subscribe({
        next: () => {
          this.toastr.success(
            'Zodiac Sign had been updated successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.fetchZodiacSign();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while updating Zodiac Sign.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
    }
    }

    submitConfirmDelete(termId: string): void {
      this._adminService.deleteZodiacSignByID(termId).subscribe({
        next: () => {
          this.toastr.success(
            'Zodiac Sign had been deleted successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.fetchZodiacSign();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while deleting Zodiac Sign.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
        },
      });
    }
}
