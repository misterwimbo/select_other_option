/**
 * Ajoute une option "Autre" à tous les éléments <select> avec la classe 'select-autre'.
 * Si l'option "Autre" est sélectionnée, un champ texte est affiché pour permettre à l'utilisateur de préciser.
 * 
 * Fonctionnalités :
 * - Ajoute une option "Autre" si elle n'existe pas déjà.
 * - Crée un champ texte caché qui est affiché lorsque l'option "Autre" est sélectionnée.
 * - Gère l'affichage et la validation du champ texte en fonction de la sélection.
 * 
 * @function
 */
function add_other_option_select() {

    // Sélectionner tous les <select> avec la classe 'select-autre'
    const selects = document.querySelectorAll('select.select-autre');

    selects.forEach(select => {
        // Initialiser Select2
        // if ( detectDevice() != 'mobile' ) {  $('select').select2({"width": "100%"}); } // COMMENT120924

        // Vérifier si l'option "Autre" est déjà présente
        let optionAutreExist = Array.from(select.options).some(option => option.value === 'autre');

        if (!optionAutreExist) {
            // Ajouter l'option 'Autre' si elle n'existe pas encore
            let optionAutre = document.createElement('option');
            optionAutre.value = 'autre';
            optionAutre.text = 'Autre , préciser...';
            select.appendChild(optionAutre);
        }

        // Si l'input texte pour "Autre" existe déjà, ne pas le recréer
        let inputId = select.id + '_autre';
        if (!document.getElementById(inputId)) {
            // Créer un champ texte caché qui sera affiché quand "Autre" est sélectionné
            let inputAutre = document.createElement('input');
            inputAutre.type = 'text';
            inputAutre.id = inputId;
            inputAutre.name = select.name + '_autre';
            inputAutre.style.display = 'none';  // Masquer par défaut
            inputAutre.required = false; // Non obligatoire par défaut

            // if select have class 'searchable-select'
            if (select.classList.contains('searchable-select')) {
                inputAutre.classList.add('form-control');
                inputAutre.style.margin = '0 5px';
            }
            else{
                inputAutre.classList.add('form-control', 'mt-2');
            }

            inputAutre.placeholder = 'Préciser...';

            // Ajouter le champ juste après le select (ou dans un wrapper, selon le design)
            select.parentNode.insertBefore(inputAutre, select.nextSibling);

            //focus sur le champ texte
            setTimeout(() => {inputAutre.focus();}, 100);
        }

        // Gestion du changement de valeur de Select
        $(select).on('change', function () {
            let inputAutre = document.getElementById(select.id + '_autre');
            if (this.value === 'autre') {
                // Si l'option "Autre" est sélectionnée, afficher l'input texte et le rendre obligatoire
                inputAutre.style.display = 'block';
                inputAutre.required = true;
            } else {
                // Sinon, masquer l'input texte et le rendre non obligatoire
                inputAutre.style.display = 'none';
                inputAutre.required = false;
            }
        });
    });
}
