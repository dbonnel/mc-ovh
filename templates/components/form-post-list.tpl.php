<form action="" method="POST">

            <div class="fields-group-top">

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'category', 'field_label' => 'Catégorie', 'field_options' => __('categories'), 'field_value' => __('fields_values', 'category')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'classe', 'field_label' => 'Classe', 'field_options' => __('classes'), 'field_value' => __('fields_values', 'classe')])?>

                <?php __inc('components/field-box', ['field_type' => 'select', 'field_format' => 'sm1-lg4', 'field_name' => 'status', 'field_label' => 'Status', 'field_options' => __('status'), 'field_value' => __('fields_values', 'status')])?>


                    <input type="submit" id="select-list" class="search-btn" value="Afficher">

            </div>
        <form>
