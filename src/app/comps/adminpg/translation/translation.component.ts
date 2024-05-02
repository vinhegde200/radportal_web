import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { KeyVal, Translation } from '../../../model/config.model';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TxrowComponent } from './txrow/txrow.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NewlangComponent } from './newlang/newlang.component';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [DropdownModule,
    CommonModule,
    TxrowComponent,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    NewlangComponent],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit {
  @ViewChild('fileinput') filein: ElementRef | undefined;
  langs: Translation[] | undefined;
  translations: Translation | undefined;
  txjson: KeyVal[] | undefined;
  showAddLang: boolean = false;

  items: any;

  constructor(private ss: SettingsService) {}
  ngOnInit(): void {
    this.getLanguages();
    const _parent = this;
    this.items = [
      {
        label: 'Import strings',
        icon: 'pi pi-plus',
        command: () => {
          if (this.filein) {
            this.filein.nativeElement.onchange = function(event: any) {
              _parent.readText(event, _parent);
            };
            this.filein?.nativeElement.click();
          }
        }
      }
    ];
    
  }

  getLanguages() {
    this.ss.getLanguages()
    .subscribe({
      next: (res: any) => {
        this.langs = res.data as Translation[];
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getLangStrings(lang: string) {
    this.ss.getTranslations(lang)
    .subscribe({
      next: (res: any) => {
        this.translations = res.data as Translation;
        if (this.translations != null && this.translations.txjson != null) {
          const _t = JSON.parse(this.translations.txjson);
          const result: KeyVal[] = Object.keys(_t).map((key) => {
            return {key: key, value: _t[key]}
          });
          if (result && result.length > 0) {
            this.txjson = result;
          } else {
            this.txjson = [];
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  langSelected(event: DropdownChangeEvent) {
    console.log('Changed to ' + event.value);
    this.getLangStrings(event.value.lang);
  }

  addRow() {
    this.txjson?.push({
      key: "",
      value: "",
      dirty: true
    })
  }

  showAddNewLang() {
    this.showAddLang = true;
  }

  addLanguage(tx: Translation) {
    this.ss.saveLanguages(tx.lang, tx)
    .subscribe({
      next: (res: any) => {
        this.getLanguages();
        this.showAddLang = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  saveTranslations() {
    const txObj: any = {};
    this.txjson?.forEach((itm: KeyVal) => {
      txObj[itm.key] = itm.value;
    });
    console.log("Final Object is " + txObj);
    if (this.translations != null) {
      this.translations.txjson = JSON.stringify(txObj);
      this.ss.saveLanguages(this.translations.lang, this.translations)
      .subscribe({
        next: (res: any) => {
          this.getLangStrings(this.translations?.lang || "en");
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  download() {
    const txObj: any = {};
    this.txjson?.forEach((itm: KeyVal) => {
      txObj[itm.key] = itm.value;
    });
    const lang = this.translations?.lang;
    this.downloadNow(`translations_${lang}.json`, JSON.stringify(txObj, null, 2));
  }

  downloadNow(file: string, text: any) {
    let element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8, '
        + encodeURIComponent(text));
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  readText(event: any, parent: TranslationComponent) {
    let filecontent: any = "";
    var myFile = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
      filecontent = e.target?.result;
      parent.processFileContent(filecontent);
    });
    reader.readAsText(myFile);
  }

  processFileContent(fileStr: string) {
    const _t = JSON.parse(fileStr);
    const result: KeyVal[] = Object.keys(_t).map((key) => {
      return {key: key, value: _t[key]}
    });
    if (result && result.length > 0) {
      this.txjson = result;
    } else {
      this.txjson = [];
    }
  }

  clearLang() {
    this.txjson = [];
    this.translations = undefined;
  }
}
