from django import forms
from .models import vehiculo
from datetime import datetime

class vehiculoForm (forms.ModelForm) :
    class Meta :
        model = vehiculo
        exclude = ['total']
        
class analisisDate (forms.Form):
    startdate = forms.DateField(widget=forms.DateInput(attrs={'id': 'date-start-input','class':'input-sm form-control'}))
    enddate = forms.DateField(widget=forms.DateInput(attrs={'id': 'date-end-input','class': 'input-sm form-control'}))
    cat_choices = [('i','Cat.I'), ('ie','Cat.IE'), ('iea','Cat.IEA'), ('ieb','Cat.IEB'), ('ii','Cat.II'), ('iie','Cat.IIE'), ('iiee','Cat.IIEE'), ('iia','Cat.IIA'), ('iii','Cat.III'), ('iiie','Cat.IIIE'), ('iv','Cat.IV'), ('ive','Cat.IVE'), ('v','Cat.V'), ('vb','Cat.VB'), ('ve','Cat.VE'), 
    ('vi','Cat.VI'), ('vii','Cat.VII')]
    select_multiple  = [(1,'Recaudo'),(2,'Vehiculo')]
    categorias = forms.ChoiceField(widget=forms.SelectMultiple(attrs={'class':'form-control'}),choices=cat_choices)
    dataChose= forms.ChoiceField(widget=forms.RadioSelect,choices =select_multiple)

class tableForm(forms.Form):
    startdate = forms.DateField(widget=forms.DateInput(attrs={'class':'input-sm form-control'}))
    enddate = forms.DateField(widget=forms.DateInput(attrs={'class': 'input-sm form-control'}))

class reporteForm(forms.Form):
    contratista = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','id':'reporte-contratista'}))
    startdate = forms.DateField(widget=forms.DateInput(attrs={'class':'input-sm form-control','id':'reporte-startdate'}))
    enddate = forms.DateField(widget=forms.DateInput(attrs={'class': 'input-sm form-control','id':'reporte-enddate'}))
    texto = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control','id':'reporte-texto'}))



    