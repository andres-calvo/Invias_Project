if request.POST.get('radiovalue') == 'Recaudo':
            query = recaudo.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            query2 = recaudo.objects.filter(fecha__range=[startdate,enddate]).values('fecha','total').order_by('fecha')

            for entry in query2:
                datos.setdefault('Fechas',[]).append(entry['fecha'])
                datos.setdefault('Total',[]).append(entry['total'])

            for entry in query:
                for f in fields:
                    datos.setdefault('Cat.'+f,[]).append(entry[f])
            
        else:
            query = vehiculo.objects.filter(fecha__range=[startdate,enddate]).values(*fields).order_by('fecha')
            query2 = vehiculo.objects.filter(fecha__range=[startdate,enddate]).values('fecha','total').order_by('fecha')

            for entry in query2:
                datos.setdefault('Fechas',[]).append(entry['fecha'])
                datos.setdefault('Total',[]).append(entry['total'])
            for entry in query:
                for f in fields:
                    datos.setdefault('Cat.'+f,[]).append(entry[f])