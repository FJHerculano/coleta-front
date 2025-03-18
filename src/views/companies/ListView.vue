<template>

    <div class="container-fluid mt-2 mb-4">
        
        <div class="card shadow-lg">
            <div>
                <h4 class="card-header">
                    Empresas de coleta
                </h4>

                <RouterLink class="btn btn-dark float-end" to="/companies/new">
                    <i class="bi bi-plus"></i>&nbsp;
                    Nova Empresa
                </RouterLink>
            </div>
        </div>
        
        <div class="card-body">

            <div class="table-responsive">

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">blau</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>reger</td>
                                <td>fwerfw</td>
                                <td>@ewfew</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>erfgrewq</td>
                                <td>rgre</td>
                                <td>@rgre</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

           

        </div>

    </div>

</template>

<script>
    import { RouterLink } from 'vue-router';
</script>

<style scoped></style>