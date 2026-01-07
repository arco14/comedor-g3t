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
            <div class="modal-body">
                <form class="row" enctype="multipart/form-data">
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
                    <div id="contenedorImgFile" class="mt-3 col-12">
                        <label for="fileImge">Imagen</label>
                        <input class="form-control mt-2" type="file" id="fileImge" name="fileImg">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btnGuardar" type="submit" class="btn btn-success">Guardar</button>
            </div>
        </div>
    </div>
</div>

<div class="container p-5">
    <fieldset class="border rounded p-4">
        <legend class="float-none w-auto">Articulos</legend>
        <div>
             <button type="button" id="agregarArticulos" class="btn btn-sm btn-success" title="Agregar Nuevo Articulo">
                <i class="fas fa-plus"></i>
            </button>
            <button type="button" id="btnHome" class="btn btn-sm btn-primary" title="Ir al panel">
                <i class="fas fa-house-user "></i>
            </button>
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