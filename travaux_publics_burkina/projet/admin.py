from django.contrib import admin
from .models import Decaissement, Livrable

# Register your models here.
class LivrableInline(admin.TabularInline):
    model = Livrable
    extra = 1

@admin.register(Decaissement)
class DecaissementAdmin(admin.ModelAdmin):
    list_display = ('projet', 'nomEtape', 'montant', 'budgetRestant', 'dateDecaissement')
    inlines = [LivrableInline]