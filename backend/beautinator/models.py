from django.db import models
from datetime import timedelta, time, date


# When edited modify the admin too


def time_to_int(gvn_time):
    return (gvn_time.hour * 60 + gvn_time.minute) // 15


def duration_to_int(duration):
    return (duration.total_seconds() // 60) // 15


class User(models.Model):
    GENDER_CHOICES = [
        ('F', 'Feminin'),
        ('M', 'Masculin'),
        ('N', 'Niciuna / Prefer sa nu spun'),
    ]

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True)
    birthday = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def get_gender(self):
        return self.get_gender_display()


class Location(models.Model):
    COUNTRY_CHOICES = (
        ('RO', 'Romania'),
    )
    COUNTY_CHOICES = (
        ('AB', 'ALBA'),
        ('AR', 'ARAD'),
        ('AG', 'ARGES'),
        ('BC', 'BACAU'),
        ('BH', 'BIHOR'),
        ('BN', 'BISTRITA-NASAUD'),
        ('BT', 'BOTOSANI'),
        ('BV', 'BRASOV'),
        ('BR', 'BRAILA'),
        ('BZ', 'BUZAU'),
        ('CS', 'CARAS-SEVERIN'),
        ('CJ', 'CLUJ'),
        ('CT', 'CONSTANTA'),
        ('CV', 'COVASNA'),
        ('DB', 'DIMBOVITA'),
        ('DJ', 'DOLJ'),
        ('GL', 'GALATI'),
        ('GJ', 'GORJ'),
        ('HR', 'HARGHITA'),
        ('HD', 'HUNEDOARA'),
        ('IL', 'IALOMITA'),
        ('IS', 'IASI'),
        ('IF', 'ILFOV'),
        ('MM', 'MARAMURES'),
        ('MH', 'MEHEDINTI'),
        ('MS', 'MURES'),
        ('NT', 'NEAMT'),
        ('OT', 'OLT'),
        ('PH', 'PRAHOVA'),
        ('SM', 'SATU_MARE'),
        ('SJ', 'SALAJ'),
        ('SB', 'SIBIU'),
        ('SV', 'SUCEAVA'),
        ('TR', 'TELEORMAN'),
        ('TM', 'TIMIS'),
        ('TL', 'TULCEA'),
        ('VS', 'VASLUI'),
        ('VL', 'VILCEA'),
        ('VN', 'VRANCEA'),
        ('B', 'BUCURESTI'),
        ('CL', 'CALARASI'),
        ('GR', 'GIURGIU'),
    )

    country = models.CharField(max_length=3, choices=COUNTRY_CHOICES, default='RO')
    county = models.CharField(max_length=2, choices=COUNTY_CHOICES, default='B')
    city = models.CharField(max_length=20, default='Bucuresti')

    def __str__(self):
        return str(self.get_country_display() + ", " + self.get_county_display() + ", " + self.city)


class Salon(models.Model):
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=400, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    location = models.ForeignKey(
        to=Location,
        on_delete=models.PROTECT
    )
    address = models.CharField(max_length=100)
    women_services = models.BooleanField(default=False)
    men_services = models.BooleanField(default=False)
    kids_services = models.BooleanField(default=False)

    def get_location(self):
        return self.location.__str__()
    get_location.short_description = 'Location'


class Service(models.Model):
    CATEGORY_CHOICES = [
        ('FH', 'Coafor'),
        ('BE', 'Cosmetica'),
        ('MH', 'Frizerie'),
        ('MP', 'Manichiura'),
    ]

    salon = models.ForeignKey(
        to=Salon,
        on_delete=models.CASCADE
    )
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=200, blank=True)
    price = models.FloatField()
    duration = models.DurationField(default=timedelta(minutes=15))

    def duration_to_int(self):
        return duration_to_int(self.duration)

    def duration_in_minutes(self):
        return self.duration.total_seconds() // 60

    def get_category(self):
        return self.get_category_display()


class Appointment(models.Model):
    client = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE
    )
    service = models.ForeignKey(
        to=Service,
        on_delete=models.CASCADE
    )
    start_date = models.DateField()
    start_time = models.TimeField()

    def start_time_to_int(self):
        return time_to_int(self.start_time)

    def duration_to_int(self):
        return duration_to_int(self.service.duration)

    def duration_in_minutes(self):
        return self.service.duration.total_seconds() // 60
