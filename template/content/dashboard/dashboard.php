<section class="container dashboard">
    <div class="row g-3">
        <!-- CARD 1 -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card-dash h-100 p-3 d-flex align-items-center">
                <div class="me-3">
                    <i class="icon-kpy fas fa-arrow-trend-up alert-success 
                        p-3 p-md-4 rounded"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-1 text-uppercase title-dash">Entregados Día</p>
                    <span id="entregadosDia" class="text-infoDash"></span>
                </div>
            </div>
        </div>

        <!-- CARD 2 -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card-dash h-100 p-3 d-flex align-items-center">
                <div class="me-3">
                    <i class="icon-kpy fas fa-clock alert-primary 
                        p-3 p-md-4 rounded"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-1 text-uppercase title-dash">Comedor G3T Horario</p>
                    <span id="fechaActual" class="text-infoDash"></span>
                </div>
            </div>
        </div>

        <!-- CARD 3 -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card-dash h-100 p-3 d-flex align-items-center">
                <div class="me-3">
                    <i class="icon-kpy fas fa-users alert-info 
                        p-3 p-md-4 rounded"></i>
                </div>
                <div class="flex-grow-1">
                    <p class="mb-1 text-uppercase title-dash">Empleados Activos</p>
                    <span id="empleadosActivos" class="text-infoDash"></span>
                </div>
            </div>
        </div>

    </div>
</section>

<script src="../../../../comedor/template/content/dashboard/dashboard.js"></script>
