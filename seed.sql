USE trouve_ton_artisan;

--Plombier Martin
INSERT INTO artisans(name,rating,locality,specialty_id,website,picture_url,about,email)
SELECT 'Plombier Martin',4,'Clermont-Ferrand',s.id,NULL,
       '/images/artisans/plombier-martin.jpg',
       'Dépannage 24/7, installations neuves.','martin@plomberie.example'
FROM specialties s
WHERE s.name='Plomberie'
  AND NOT EXISTS (SELECT 1 FROM artisans a WHERE a.name='Plombier Martin');

--Studio Belle Coupe
INSERT INTO artisans(name,rating,locality,specialty_id,website,picture_url,about,email)
SELECT 'Studio Belle Coupe',3,'Valence',s.id,NULL,
       '/images/artisans/belle-coupe.jpg',
       'Coiffure mixte, colorations végétales.','rdv@bellecoupe.example'
FROM specialties s
WHERE s.name='Coiffure'
  AND NOT EXISTS (SELECT 1 FROM artisans a WHERE a.name='Studio Belle Coupe');


UPDATE artisans SET picture_url='/images/artisans/atelier-bois.png',
                    about='Spécialiste du sur-mesure en chêne.',
                    email='contact@atelierbois.example'
WHERE name='Atelier du Bois';

UPDATE artisans SET picture_url='/images/artisans/plombier-martin.jpg'
WHERE name='Plombier Martin';

UPDATE artisans SET picture_url='/images/artisans/elec-co.png',
                    about='Mise aux normes, domotique et IRVE.',
                    website='https://elec-co.example',
                    email='contact@elec-co.example'
WHERE name='Élec&Co';

UPDATE artisans SET picture_url='/images/artisans/boulangerie-alpes.png',
                    website='https://boulangeriealpes.example',
                    about='Pain au levain et viennoiseries maison.',
                    email='hello@boulangeriealpes.example'
WHERE name='Boulangerie des Alpes';

UPDATE artisans SET picture_url='/images/artisans/belle-coupe.jpg'
WHERE name='Studio Belle Coupe';


SELECT id,name,picture_url FROM artisans ORDER BY name;
