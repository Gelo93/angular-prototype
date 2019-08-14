import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public tree = [];

  public useFormRenderer(payload){
    this.tree = [];
    const dataComponentss = payload.DataComponents;
    const groups = dataComponentss.filter(component => component.DisplayTypeShortCode === 'GROUP');
  
    groups.forEach(group => {
      const setting = group.Settings.find(setting => setting.Id === 'DATA_COMPONENTS');
      if (setting) {
        const shortCodes = setting.Text.split(';');
        if (shortCodes.length > 0) {
          group.children = dataComponentss.filter(component => shortCodes.includes(component.ShortCode));
        }
      }
    });
  
    groups.forEach(group => {
      const subGroups = [];
  
      group.children.forEach(child => {
        if (child.DisplayTypeShortCode === 'GROUP') {
          subGroups.push(child);
        }
      });
  
      if (subGroups.length > 0) {
        subGroups.forEach(s => {
          this.tree = this.tree.filter(t => t.ShortCode !== s.ShortCode);
        });
      }
  
      this.tree.push(group);
    });
  
    return this.tree;
  };
}
