
        <form action="<?=__('current_url')?>" method="POST">
            <?php if (__('id')) {
    __inc('components/field-box', ['field_type' => 'hidden', 'field_name' => 'id', 'field_value' => __('id')]);
}?>
            <div class="fields-group-top">
                <div class="align-right">
                    <input type="submit" class="main-btn mb-2" value="Enregistrer">
                </div>
                <?php __inc('components/field-box', ['field_type' => 'input', 'field_format' => 'sm1-lg4', 'field_name' => 'title', 'field_label' => 'Titre', 'field_placeholder' => 'ex : Mon post', 'field_value' => __('fields_values', 'title')])?>

                <?php __inc('components/field-box', ['field_type' => 'input', 'field_format' => 'sm1-lg4', 'field_name' => 'slug', 'field_label' => 'Slug', 'field_placeholder' => 'ex : mon_post', 'field_value' => __('fields_values', 'slug')])?>

                <?php __inc('components/field-box', ['field_type' => 'input', 'field_format' => 'sm1-lg4', 'field_name' => 'menu_order', 'field_label' => 'Numéro d\'ordre', 'field_placeholder' => 'ex : 15000000', 'field_value' => __('fields_values', 'menu_order')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'category', 'field_label' => 'Catégorie', 'field_options' => __('categories'), 'field_value' => __('fields_values', 'category')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'classe', 'field_label' => 'Classe', 'field_options' => __('classes'), 'field_value' => __('fields_values', 'classe')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'difficult', 'field_label' => 'Difficulté', 'field_options' => __('difficults'), 'field_value' => __('fields_values', 'difficult')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'chapitre', 'field_label' => 'Chapitre', 'field_options' => __('chapitres'), 'field_value' => __('fields_values', 'chapitre')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'status', 'field_label' => 'Status', 'field_options' => __('status'), 'field_value' => __('fields_values', 'status')])?>


                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'annale_classe', 'field_label' => 'Classe Annale', 'field_options' => __('annale_classes'), 'field_value' => __('fields_values', 'annale_classe')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'annale_annee', 'field_label' => 'Année Annale', 'field_options' => __('annale_annees'), 'field_value' => __('fields_values', 'annale_annee')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'annale_lieu', 'field_label' => 'Lieu Annale', 'field_options' => __('annale_lieux'), 'field_value' => __('fields_values', 'annale_lieu')])?>

                <?php __inc('components/field-box', ['field_type' => 'input', 'field_format' => 'sm1-lg4', 'field_name' => 'annale_order', 'field_label' => 'Numéro d\'annale', 'field_placeholder' => 'ex : 15000000', 'field_value' => __('fields_values', 'annale_order')])?>

                <?php if (__('id')): ?>
                <?php __inc('components/field-box', ['field_type' => 'textarea', 'field_format' => 'sm1-xl2', 'field_name' => 'source', 'field_label' => 'Source', 'field_rows' => '10', 'field_value' => __('fields_values', 'source')])?>

                <?php __inc('components/field-box', ['field_type' => 'text', 'field_format' => 'sm1-xl2 no-border', 'field_name' => 'text-content', 'field_label' => 'Texte', 'field_rows' => '10', 'field_value' => __('fields_values', 'text-content')])?>

                <?php __inc('components/field-box', ['field_type' => 'textarea', 'field_format' => 'xl1', 'field_name' => 'html_content', 'field_label' => 'Html', 'field_rows' => '10', 'field_value' => __('fields_values', 'html_content')])?>

                <?php endif?>
                <div class="align-right">
                    <input type="submit" class="main-btn" value="Enregistrer">
                </div>
            </div>
        <form>
