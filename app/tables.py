import django_tables2 as tables
from .models import recaudo

class PersonTable(tables.Table):
    class Meta:
        model = recaudo
        template_name = "django_tables2/bootstrap4.html"
        fields = '__all__'