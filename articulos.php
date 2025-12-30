<?php 
    include './template/head/head.php';
?>
<!-- Modal -->
<div
    class="modal fade"
    id="modalArticulos"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">
                    Modal Articulos
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body row">
                <div class="col-12 d-flex justify-content-end gap-2">
                    <label for="swActivo" class="form-label">Activo</label>
                    <div id="swActivo"></div>
                </div>
                 <div class="mt-3 col-12">
                    <label for="textBoxNombre" class="form-label">Nombre</label>
                    <div id="textBoxNombre"></div>
                </div>
                 <div class="mt-3 col-sm-12 col-md-6">
                    <label for="textBoxClave" class="form-label">Clave</label>
                    <div id="textBoxClave"></div>
                </div>
                 <div class="mt-3 col-sm-12 col-md-6">
                    <label for="numberBoxPrecio" class="form-label">Precio</label>
                    <div id="numberBoxPrecio"></div>
                </div>
                <div class="mt-3 col-12">
                    <label for="textBoxImagen" class="form-label">Imagen</label>
                    <div id="textBoxImagen"></div>
                </div>
            </div>
            <div class="modal-footer">
                <div id="btnGuardar"></div>
            </div>
        </div>
    </div>
</div>

<div class="container p-5">
    <fieldset class="border rounded p-4">
        <legend class="float-none w-auto">Articulos</legend>
        <div>
            <div id="agregarArticulos" class="btn btn-sm btn-success px-3">
                <span class="h3">+</span>
            </div>
        </div>
        <div id="dataGridArticulos" class="mt-4"></div>
    </fieldset>
</div>
<script src="./assets/devExtreme/components/dataGrid.js"></script>
<script src="./assets/devExtreme/components/textBox.js"></script>
<script src="./assets/devExtreme/components/numberBox.js"></script>
<script src="./assets/devExtreme/components/switch.js"></script>
<script src="./assets/devExtreme/components/button.js"></script>
<script src="./assets/js/articulos.js"></script>