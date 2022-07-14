import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule
{
    /**
     * Constructor
     */
    constructor(
        private _domSanitizer: DomSanitizer,
        private _matIconRegistry: MatIconRegistry
    )
    {
        // Register icon sets
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-outline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/heroicons-solid.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('material_outline', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/material-ouline.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('iconsmind', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/iconsmind.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('material_twotone', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/material-twotone.svg'));
        this._matIconRegistry.addSvgIconSetInNamespace('truck_lift', this._domSanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/truck-lift.svg'));
       
        
    }
}