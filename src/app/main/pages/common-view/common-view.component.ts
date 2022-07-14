import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutingModule } from '../routing/routing.module';
import {filter, map} from 'rxjs/operators'
import { VerticalNavigationComponent } from '../../shared/component/navigation';
import { NavigationItem } from '../../shared/component/navigation';

@Component({
  selector: 'app-common-view',
  templateUrl: './common-view.component.html',
  styleUrls: ['./common-view.component.scss']
})
export class CommonViewComponent implements OnInit {

  public titre?:string;
  public titreSubs?:Subscription;
  

  constructor(private router:Router) {
    this.titreSubs= this.getArguments().subscribe(({titre}) =>{
      this.titre = titre;
    })

   }

  ngOnInit(): void {
  }

  getArguments(){
    return this.router.events.pipe(

      filter((event:any) => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)
    )
    
  }
  public navigationtest : NavigationItem[] = [

    {
        id      : 'pages',
        title   : '',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:document',
        children: [
            {
                id   : 'pages.activities',
                title: 'Tableau de bord',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboard'
            },
            {
                id   : 'pages.activities',
                title: 'Administration',
                permission :'Administration',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/pages/activities'
            },
            {
                id   : 'pages.activities',
                title: 'Référentiel',
                permission :'Administration',
                type : 'basic',
                icon : 'heroicons_outline:menu-alt-2',
                link : '/pages/activities'
            },
            {
                id      : 'pages.prestation',
                title   : 'Prestation',
                type    : 'collapsable',
                icon    : 'heroicons_outline:clipboard-check',
                children: [
                    {
                        id      : 'pages.prestation.navire',
                        title   : 'Navire',
                        icon : 'material_twotone:directions_boat',
                        type    : 'collapsable',
                        children: [
                            {
                                id   : 'pages.authentication.sign-in.classic',
                                        title: 'Commandes',
                                        icon:'material_twotone:reorder',
                                        type : 'basic',
                                        link : '/navire/cmd'
                            },{
                                id   : 'pages.authentication.sign-in.classic',
                                        title: 'Bulletins prestation',
                                        icon:'heroicons_outline:document-text',
                                        type : 'basic',
                                        link : '/navire/bp'
                            },

                            {
                                id : 'pages.authentication.sign-in.classic',
                                title: 'Historique',
                                icon:'material_twotone:history',
                                type: 'collapsable',
                                children: [
                                    {
                                        id   : 'pages.authentication.sign-in.classic',
                                        title: 'Commandes',
                                        icon:'heroicons_outline:',
                                        type : 'basic',
                                        link : '/navire/historique-cmd'
                                    },
                                    {
                                        id   : 'pages.authentication.sign-in.classic',
                                        title: 'Bulletins',
                                        icon:'heroicons_outline',
                                        type : 'basic',
                                        link : '/navire/historique-bp'
                                    }

                                ]
                            },
                        ]
                    },
                    {
                        id      : 'pages.authentication.sign-in',
                        title   : 'Manutention',
                        icon:'material_twotone:precision_manufacturing',
                        type    : 'collapsable',
                        children: [
                            {
                                id   : 'pages.authentication.sign-in.classic',
                                title: 'Commandes',
                                icon:'material_twotone:reorder',
                                type : 'basic',
                                link : '/5'
                            },
                            {
                                id   : 'pages.authentication.sign-in.modern',
                                title: 'Bulletins prestation',
                                icon:'heroicons_outline:document-text',
                                type : 'basic',
                                link : '/6'
                            },
                            {
                                id : 'pages.authentication.sign-in.classic',
                                title: 'Historique',
                                icon:'material_twotone:history',
                                type: 'collapsable',
                                children: [
                                    {
                                        id   : 'pages.authentication.sign-in.classic',
                                        title: 'Commandes',
                                        icon:'heroicons_outline:',
                                        type : 'basic',
                                        link : '/7'
                                    },
                                    {
                                        id   : 'pages.authentication.sign-in.classic',
                                        title: 'Bulletins',
                                        icon:'heroicons_outline',
                                        type : 'basic',
                                        link : '/8'
                                    }

                                ]
                            },
                        ]
                    },
                    {
                        id      : 'pages.prestation.marchandise',
                        title   : 'Marchandise',
                        icon:'material_twotone:view_module',
                        type    : 'collapsable',
                        children: [
                            {
                                id   : 'pages.prestation.marchandise.gdv',
                                title: 'Gestion de vie',
                                type : 'basic',
                                link : '/1'
                            },
                            {
                                id   : 'pages.prestation.marchandise.gcmd',
                                title: 'Gestion commande',
                                type : 'basic',
                                link : '/2'
                            },
                            {
                                id   : 'pages.prestation.marchandise.gbp',
                                title: 'Gestion BP',
                                type : 'basic',
                                link : '/3'
                            },
                            {
                                id   : 'pages.prestation.marchandise.hcmd',
                                title: 'Historique commande',
                                type : 'basic',
                                link : '/4'
                            },
                            {
                                id   : 'pages.prestation.marchandise.hbp',
                                title: 'Historique BP',
                                type : 'basic',
                                link : '/5'
                            }
                        ]
                    }
                ]
            },
            {
                id   : 'pages.settings',
                title: 'Paramétrages',
                permission :'Administration',
                type : 'basic',
                icon : 'heroicons_outline:cog',
                link : '/pages/settings'
            }
        ]
    }

  ]

  

}
