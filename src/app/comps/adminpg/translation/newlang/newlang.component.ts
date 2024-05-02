import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Translation } from '../../../../model/config.model';

@Component({
  selector: 'app-newlang',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [TranslateStore, TranslateService],
  templateUrl: './newlang.component.html',
  styleUrl: './newlang.component.scss'
})
export class NewlangComponent implements OnInit {
  @Output('lang') lang = new EventEmitter<Translation>();
  newLangForm = new FormGroup({
    lang: new FormControl('', Validators.required),
    langstr: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
      
  }

  createLanguage() {
    let _l = this.newLangForm.get("lang")?.value;
    let _lstr = this.newLangForm.get("langstr")?.value;
    const tx: Translation = {
      lang: _l ? _l : '',
      langstr: _lstr ? _lstr : '',
      txjson: "{}"
    };
    this.lang.emit(tx);
  }
}
