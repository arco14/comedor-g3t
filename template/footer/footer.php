        <footer class="container-fluid d-flex align-items-center justify-content-center gap-2 py-3 fixed-bottom">
            <div class="float-right d-none d-sm-block">
                <b>Version</b> <span class="text-bold" style="color: #e89c00">1.0</span>
            </div>
            <strong>Copyright <span id="dateCopyRight"></span> <a class="text-bold text-decoration-none"
                    style="color: #e89c00">
                    &copy; GRUPO 3T.</a></strong>
            </div>
        </footer>
        <!-- Sweet Alert  -->
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="../../comedor/assets/bootstrap/js/bootstrap.min.js"></script>
        <script>
            const dateCopy = new Date()
            const formatDateCopy = moment(dateCopy).format('Y')
            $('#dateCopyRight').text(formatDateCopy)
        </script>
        </body>

        </html>