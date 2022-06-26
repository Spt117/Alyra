# Devoir Alyra n°2 : tests unitaires sur le contrat Voting

Pour ne rien oublier, j'ai choisi de faire mes tests en suivant au maximum le contrat !

---

## Nombre de tests effectués : 46

## Durée moyenne : 1 minute

---

## 1) Test du set et du get des voteurs

### Nombre de tests : 8

#### 3 tests pour vérifier l'enregistrement des électeurs
#### 1 test pour vérifier l'évènement
#### 4 tests pour vérifier les require

---

## 2) Test du set et du get des propositions

### Nombre de tests : 8

#### 3 tests pour vérifier l'enregistrement des propositions
#### 1 test pour vérifier l'évènement
#### 4 tests pour vérifier les require

---

## 3) Test de la fonction vote

### Nombre de tests : 7

#### 2 tests pour vérifier l'enregistrement des votes
#### 1 test pour vérifier l'évènement
#### 4 tests pour vérifier les require

---

## 4) Test des STATES

### Nombre de tests : 17

Pour les states, j'ai procédé en deux étapes !

#### Etape 1 : vérifier le changements de status

##### 1 test pour vérifier l'état initial
##### 4 tests pour vérifier les changements de status

#### Etape 2 : vérifier les events et les require

##### 8 tests alternant le require OnlyOwner et Event
##### 4 tests pour les requires des status

---

## 5) Test de la fonction tallyVotes

### Nombre de tests : 6

#### 1 test pour vérifier la proposition gagnante
#### 1 test pour vérifier le changement de status
#### 1 test pour vérifier l'évènement
#### 3 tests pour vérifier les requires