import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// @ts-ignore
import * as ClassicEditor from 'src/assets/ckeditor/ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagination',
  templateUrl: './dream-dictionary.component.html',
  styleUrls: ['./dream-dictionary.component.scss'],
})
export class DreamDictionaryComponent implements OnInit {
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
  dreamForm!: FormGroup;

  ngOnInit() {
    this.dreamForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', [Validators.required]],
    });
    this.fetchDreamDictionary();
  }

  fetchDreamDictionary() {
    this._adminService.fetchDreamDictionary().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: () => {
        this.toastr.error(
          'Some error occured while fetching Dream Dictionary.',
          '',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
      },
    });
  }

  openEditDreamDictionaryModal(
    template: TemplateRef<any>,
    termId: string
  ): void {
    this.modalRef = this.modalService.show(template, this.dreamConfig);
    this.fetchDreamDictionaryById(termId);
  }

  fetchDreamDictionaryById(termId: string) {
    this._adminService.fetchDreamTermById(termId).subscribe({
      next: (response: any) => {
        this.dreamForm.get('title')?.setValue(response.name);
        this.dreamForm.get('desc')?.setValue(response.desc);
      },
      error: () => {
        this.toastr.error(
          'Some error occured while fetching Dream Dictionary.',
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

  addDictionary(template: TemplateRef<any>) {
    this.dreamForm.reset();
    this.modalRef = this.modalService.show(template, this.dreamConfig);
  }

  deleteDictionary(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.deleteConfig);
  }

  saveDictionary() {
    this.dreamForm.markAllAsTouched();
    if (this.dreamForm.valid) {
      let body = {
        title: this.dreamForm.get('title')?.value,
        desc: this.dreamForm.get('desc')?.value,
      };
      this._adminService.addDreamDictionary(body).subscribe({
        next: () => {
          this.toastr.success(
            'Dream Dictionary had been added successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );

          this.fetchDreamDictionary();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while adding Dream Dictionary.',
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

  saveEditedDictionary(termId: string) {
    this.dreamForm.markAllAsTouched();
    if (this.dreamForm.valid) {
      let body = {
        title: this.dreamForm.get('title')?.value,
        desc: this.dreamForm.get('desc')?.value,
      };
      this._adminService.editDreamDictionary(termId, body).subscribe({
        next: () => {
          this.toastr.success(
            'Dream Dictionary had been updated successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.fetchDreamDictionary();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while updating Dream Dictionary.',
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
    this._adminService.deleteDreamTermByID(termId).subscribe({
      next: () => {
        this.toastr.success(
          'Dream Dictionary had been deleted successfully.',
          '',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
        this.fetchDreamDictionary();
        this.modalRef.hide();
      },
      error: () => {
        this.toastr.error(
          'Some error occured while deleting Dream Dictionary.',
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
