import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// @ts-ignore
import * as ClassicEditor from 'src/assets/ckeditor/ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'astrological-dictionary',
  templateUrl: './astrological-dictionary.component.html',
  styleUrls: ['./astrological-dictionary.component.scss'],
})
export class AstrologicalDictionaryComponent implements OnInit {
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
  astrologicalForm!: FormGroup;
  filteredData = [...this.data];

  ngOnInit() {
    this.astrologicalForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', [Validators.required]],
    });
    this.fetchAstrologicalDictionary();
  }

  fetchAstrologicalDictionary() {
    this._adminService.fetchAstrologicalDictionary().subscribe({
      next: (response) => {
        this.data = response;
        this.filteredData = [...this.data];
      },
      error: () => {
        this.toastr.error(
          'Some error occured while fetching Astrological Dictionary.',
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

  openEditAstrologicalDictionaryModal(
    template: TemplateRef<any>,
    termId: string
  ): void {
    this.modalRef = this.modalService.show(template, this.dreamConfig);
    this.fetchAstrologicalTermById(termId);
  }

  fetchAstrologicalTermById(termId: string) {
    this._adminService.fetchAstrologicalTermById(termId).subscribe({
      next: (response: any) => {
        this.astrologicalForm.get('title')?.setValue(response.name);
        this.astrologicalForm.get('desc')?.setValue(response.desc);
      },
      error: () => {
        this.toastr.error(
          'Some error occured while fetching Astrological Dictionary.',
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
    this.astrologicalForm.reset();
    this.modalRef = this.modalService.show(template, this.dreamConfig);
  }

  deleteDictionary(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.deleteConfig);
  }

  saveDictionary() {
    this.astrologicalForm.markAllAsTouched();
    if (this.astrologicalForm.valid) {
      let body = {
        title: this.astrologicalForm.get('title')?.value,
        desc: this.astrologicalForm.get('desc')?.value,
      };
      this._adminService.addAstrologicalDictionary(body).subscribe({
        next: () => {
          this.toastr.success(
            'Astrological Dictionary had been added successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );

          this.fetchAstrologicalDictionary();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while adding Astrological Dictionary.',
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
    this.astrologicalForm.markAllAsTouched();
    if (this.astrologicalForm.valid) {
      let body = {
        title: this.astrologicalForm.get('title')?.value,
        desc: this.astrologicalForm.get('desc')?.value,
      };
      this._adminService.editAstrologicalDictionary(termId, body).subscribe({
        next: () => {
          this.toastr.success(
            'Astrological Dictionary had been updated successfully.',
            '',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            }
          );
          this.fetchAstrologicalDictionary();
          this.modalRef.hide();
        },
        error: () => {
          this.toastr.error(
            'Some error occured while updating Astrological Dictionary.',
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
    this._adminService.deleteAstrologicalTermByID(termId).subscribe({
      next: () => {
        this.toastr.success(
          'Astrological Dictionary had been deleted successfully.',
          '',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          }
        );
        this.fetchAstrologicalDictionary();
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
