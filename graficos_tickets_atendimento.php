<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
</head>

<body>
    <table>
        <tr>
            <td>
                <canvas id="myChart"></canvas>
            </td>
            <td>
                <canvas id="myChart2"></canvas>
            </td>
            <td>
                <canvas id="myChart3"></canvas>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <canvas id="myChart4"></canvas>
            </td>
        </tr>
        <tr>
            <td colspan="3">
                <canvas id="myChart5"></canvas>
            </td>
        </tr>

    </table>

    <?php
    $connect = odbc_connect('capacidade_173', 'Sa', 'Dll123456');
    $sql = '
                  SELECT 
                  AbertoComo, 
                  CASE 
                  WHEN AbertoComo = \'Script Falhou\' THEN \'red\'
                  WHEN AbertoComo = \'Dúvida\' THEN \'yellow\'
                  WHEN AbertoComo = \'Defeito\' THEN \'orange\'
                  END AS COR,
                  COUNT(*) AS QTD 
                  FROM 
                  [TDM.DB].[DBO].REPOSITORIO_AZURE_DEVOPS_TICKETS_ATENDIMENTO 
                  GROUP BY 
                  AbertoComo ,
                  CASE 
                  WHEN AbertoComo = \'Script Falhou\' THEN \'red\'
                  WHEN AbertoComo = \'Dúvida\' THEN \'yellow\'
                  WHEN AbertoComo = \'Defeito\' THEN \'orange\'
                  END
                  ORDER BY 
                  COUNT(*) DESC;                  
                  ';
    $result = odbc_exec($connect, $sql);

    $valores = '';
    $labels = '';

    while (odbc_fetch_row($result)) {
        $valores = $valores . odbc_result($result, 'QTD') . ',';
        $labels = $labels . '\'' . utf8_encode(odbc_result($result, 'AbertoComo')) . '\',';
    }

    ?>
    <script lang="javascript">
        //Gráfico 1 - Tickets Abertos Como
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: [<?php echo $labels; ?>],
                datasets: [{
                    label: 'Tickets Abertos Como',
                    //backgroundColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    borderColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    data: [<?php echo $valores; ?>]
                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: true,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            }
        });

        // Gráfico 2 - Tickets Fechados Como
        <?php
        $connect = odbc_connect('capacidade_173', 'Sa', 'Dll123456');
        $sql = '
                  SELECT 
                  FechadoComo, 
                  CASE 
                  WHEN FechadoComo = \'Script Falhou\' THEN \'red\'
                  WHEN FechadoComo = \'Dúvida\' THEN \'yellow\'
                  WHEN FechadoComo = \'Defeito\' THEN \'orange\'
                  END AS COR,
                  COUNT(*) AS QTD 
                  FROM 
                  [TDM.DB].[DBO].REPOSITORIO_AZURE_DEVOPS_TICKETS_ATENDIMENTO 
                  GROUP BY 
                  FechadoComo ,
                  CASE 
                  WHEN FechadoComo = \'Script Falhou\' THEN \'red\'
                  WHEN FechadoComo = \'Dúvida\' THEN \'yellow\'
                  WHEN FechadoComo = \'Defeito\' THEN \'orange\'
                  END
                  ORDER BY 
                  COUNT(*) DESC;                  
                  ';
        //echo $sql;
        //return;
        $result = odbc_exec($connect, $sql);

        $valores = '';
        $labels = '';

        while (odbc_fetch_row($result)) {
            $valores = $valores . odbc_result($result, 'QTD') . ',';
            $labels = $labels . '\'' . utf8_encode(odbc_result($result, 'FechadoComo')) . '\',';
        }

        ?>

        //Gráfico 2 - Tickets Fechados Como
        var ctx = document.getElementById('myChart2').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: [<?php echo $labels; ?>],
                datasets: [{
                    label: 'Tickets Fechados Como',
                    //backgroundColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    borderColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    data: [<?php echo $valores; ?>]
                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: true,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            }
        });




        // Gráfico 3 - Tickets fechados por sistema
        <?php
        $connect = odbc_connect('capacidade_173', 'Sa', 'Dll123456');
        $sql = '
    SELECT 
            SistemaScript, 
            \'yellow\' AS COR,
            COUNT(*) AS QTD 
    FROM 
            [TDM.DB].[DBO].REPOSITORIO_AZURE_DEVOPS_TICKETS_ATENDIMENTO 
    GROUP BY 
            SistemaScript 
    ORDER BY 
            COUNT(*) DESC;';
        //echo $sql;
        //return;
        $result = odbc_exec($connect, $sql);

        $valores = '';
        $labels = '';

        while (odbc_fetch_row($result)) {
            $valores = $valores . odbc_result($result, 'QTD') . ',';
            $labels = $labels . '\'' . utf8_encode(odbc_result($result, 'SistemaScript')) . '\',';
        }

        ?>

        var ctx = document.getElementById('myChart3').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: [<?php echo $labels; ?>],
                datasets: [{
                    label: 'Tickets Fechados Por Sistema',
                    //backgroundColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    borderColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    data: [<?php echo $valores; ?>]
                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: true,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            }
        });


        // Gráfico 4 - Tickets Abertos Por Usuário
        <?php
        $connect = odbc_connect('capacidade_173', 'Sa', 'Dll123456');
        $sql = '
    SELECT 
            CreatedByDisplayName, 
            \'yellow\' AS COR, 
            COUNT(*) AS QTD 
    FROM 
            [TDM.DB].[DBO].REPOSITORIO_AZURE_DEVOPS_TICKETS_ATENDIMENTO 
    GROUP BY 
            CreatedByDisplayName
    ORDER BY        
            COUNT(*) DESC;';
        //echo $sql;
        //return;
        $result = odbc_exec($connect, $sql);

        $valores = '';
        $labels = '';

        while (odbc_fetch_row($result)) {
            $valores = $valores . odbc_result($result, 'QTD') . ',';
            $labels = $labels . '\'' . utf8_encode(odbc_result($result, 'CreatedByDisplayName')) . '\',';
        }

        ?>

        var ctx = document.getElementById('myChart4').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'radar',

            // The data for our dataset
            data: {
                labels: [<?php echo $labels; ?>],
                datasets: [{
                    label: 'Tickets Abertos Por Usuário',
                    //backgroundColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    borderColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    data: [<?php echo $valores; ?>]
                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: true,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            }
        });


        // Gráfico 5 - Tickets Fechados Por Usuário
        <?php
        $connect = odbc_connect('capacidade_173', 'Sa', 'Dll123456');
        $sql = '
    SELECT 
            REPLACE(ClosedByUniqueName,\'@ACCENTURE.COM\',\'\') AS ClosedByUniqueName, 
            \'red\' AS COR, 
            COUNT(*) AS QTD 
    FROM 
            [TDM.DB].[DBO].REPOSITORIO_AZURE_DEVOPS_TICKETS_ATENDIMENTO 
    GROUP BY 
            REPLACE(ClosedByUniqueName,\'@ACCENTURE.COM\',\'\') 
    ORDER BY        
            COUNT(*) DESC;';
        //echo $sql;
        //return;
        $result = odbc_exec($connect, $sql);

        $valores = '';
        $labels = '';

        while (odbc_fetch_row($result)) {
            $valores = $valores . odbc_result($result, 'QTD') . ',';
            $labels = $labels . '\'' . utf8_encode(odbc_result($result, 'ClosedByUniqueName')) . '\',';
        }

        ?>

        var ctx = document.getElementById('myChart5').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'horizontalBar',

            // The data for our dataset
            data: {
                labels: [<?php echo $labels; ?>],
                datasets: [{
                    label: 'Tickets Fechados Por Usuário',
                    //backgroundColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    borderColor: '<?php echo utf8_encode(odbc_result($result, 'COR')); ?>',
                    data: [<?php echo $valores; ?>]
                }]
            },

            // Configuration options go here
            /*options: {
                maintainAspectRatio: true,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            }*/
        });
    </script>
</body>

</html>