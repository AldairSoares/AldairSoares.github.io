var mydataset = [];
var labelAgrupador = [];

const Banco = {
    dropar() {
        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE TURNO');
            tx.executeSql('DROP TABLE TIPO_PARADA');
            tx.executeSql('DROP TABLE MAQUINA');
            tx.executeSql('DROP TABLE PARADA');
            tx.executeSql('DROP TABLE LINHA');
            tx.executeSql('DROP TABLE LINHA_MAQUINA');
        });
    },
    criar() {

        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS TURNO (id INTEGER PRIMARY KEY, nome TEXT, hora_inicio DATE, hora_fim DATE);');
            tx.executeSql('CREATE UNIQUE INDEX UK_TURNO_NOME ON TURNO (nome);');

            tx.executeSql('INSERT INTO TURNO (nome, hora_inicio, hora_fim) VALUES("Manhã","06:00:00","12:59:59");');
            tx.executeSql('INSERT INTO TURNO (nome, hora_inicio, hora_fim) VALUES("Tarde","13:00:00","17:59:59");');
            tx.executeSql('INSERT INTO TURNO (nome, hora_inicio, hora_fim) VALUES("Noite","18:00:00","23:59:59");');
            tx.executeSql('INSERT INTO TURNO (nome, hora_inicio, hora_fim) VALUES("Madrugada","00:00:00","05:59:59");');

        });

        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS TIPO_PARADA (id INTEGER PRIMARY KEY, nome TEXT, cor TEXT);');

            tx.executeSql('CREATE UNIQUE INDEX UK_TIPO_PARADA_NOME ON TIPO_PARADA (nome);');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Manutencao Preventiva", "green");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Manutencao Corretiva", "red");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("SETUP", "Orange");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Limpeza", "Cyan");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Parada Operacional", "Magenta");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Manutencao Mecanica", "Blue");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Manutencao Eletrica", "rgba(255,192,203,0.8)");');
            tx.executeSql('INSERT INTO TIPO_PARADA (nome, cor) VALUES("Descarte", "rgba(220,220,220,0.8)");');

        });

        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS MAQUINA (id INTEGER PRIMARY KEY, nome TEXT);');
            tx.executeSql('CREATE UNIQUE INDEX UK_MAQUINA_NOME ON MAQUINA (nome);');

            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 1.1");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 1.2");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 1.3");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 2.1");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 2.2");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 2.3");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 3.1");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 3.2");');
            tx.executeSql('INSERT INTO MAQUINA (nome) VALUES("Maquina 3.3");');

        });

        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS PARADA (id INTEGER PRIMARY KEY, id_maquina INTEGER, id_tipo_parada INTEGER, dt_inicio DATE, dt_fim DATE, descricao TEXT , FOREIGN KEY (id_maquina) REFERENCES MAQUINA (id), FOREIGN KEY (id_tipo_parada) REFERENCES TIPO_PARADA (id))');

            tx.executeSql('INSERT INTO PARADA (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) VALUES(1, 1, "2021-02-25 13:00", "2021-02-27 15:00", "Parada 1");');
            tx.executeSql('INSERT INTO PARADA (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) VALUES(2, 2, "2021-02-27 09:00", "2021-02-27 10:00", "Parada 2");');
            tx.executeSql('INSERT INTO PARADA (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) VALUES(3, 2, "2021-02-27 09:00", "2021-02-27 10:00", "Parada 3");');
            tx.executeSql('INSERT INTO PARADA (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) VALUES(3, 1, "2021-02-27 19:00", "2021-02-27 22:00", "Parada 4");');
            tx.executeSql('INSERT INTO PARADA (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) VALUES(3, 5, "2021-05-10 10:00", "2021-05-10 12:00", "Parada 5");');


        });

        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS LINHA (id INTEGER PRIMARY KEY, nome TEXT, valor INTEGER, id_turno INTEGER,  FOREIGN KEY (id_turno) REFERENCES TURNO (id));');

            tx.executeSql('CREATE UNIQUE INDEX UK_LINHA_NOME ON LINHA (nome);');
            tx.executeSql('INSERT INTO LINHA (nome, valor ) VALUES("Linha 1",250);');
            tx.executeSql('INSERT INTO LINHA (nome, valor ) VALUES("Linha 2",150);');
            tx.executeSql('INSERT INTO LINHA (nome, valor ) VALUES("Linha 3",100);');

        });




        db.transaction(function (tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS LINHA_MAQUINA (id INTEGER PRIMARY KEY, id_maquina INTEGER, id_linha INTEGER);');

            tx.executeSql('CREATE UNIQUE INDEX UK_LINHA_MAQUINA ON LINHA_MAQUINA (id_linha, id_maquina);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(1,1);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(1,2);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(1,3);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(2,4);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(2,5);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(2,6);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(3,7);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(3,8);');
            tx.executeSql('INSERT INTO LINHA_MAQUINA (id_linha, id_maquina ) VALUES(3,9);');



        });

    },

    start() {


        Swal.fire({
            title: 'SETUP',
            html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Setup',
            focusConfirm: false,
            preConfirm: () => {
                const password = Swal.getPopup().querySelector('#password').value
                if (!password || password != `1234`) {
                    Swal.showValidationMessage(`Senha inválida.`)
                } else {
                    return { password: password }
                }
            }
        }).then((result) => {

            if (result.value.password == '1234') {

                Banco.dropar();
                setTimeout(function () { Banco.criar(); }, 2000);
                setTimeout(function () { Banco.lerParadas(); }, 5000);
            }

        }).then((result) => {
            setTimeout(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Setup realizado com sucesso!',
                    showConfirmButton: false,
                    timer: 2000
                })

            }, 5000);

        });






    },
    lerParadas() {

        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

        sql = "select l.nome as nome_linha, p.id, m.nome as nome_maquina, tp.nome as tipo_parada, strftime('%d/%m/%Y %H:%M',p.dt_inicio) as dt_inicio, strftime('%d/%m/%Y %H:%M',p.dt_fim) as dt_fim, p.descricao from parada p inner join maquina m on p.id_maquina = m.id inner join tipo_parada tp on p.id_tipo_parada = tp.id inner join linha_maquina lm on lm.id_maquina = m.id  and lm.id_linha = l.id inner join linha l on lm.id_linha = l.id order by p.id desc;";

        db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
                var len = results.rows.length, i;

                var tableRef = document.getElementById('data-table').getElementsByTagName('tbody')[0];
                tableRef.innerHTML = "";

                for (i = 0; i < len; i++) {

                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.innerHTML += "<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).nome_linha + "</td><td>" + results.rows.item(i).nome_maquina + "</td><td>" + results.rows.item(i).tipo_parada + "</td><td>" + results.rows.item(i).dt_inicio + "</td><td>" + results.rows.item(i).dt_fim + "</td><td>" + results.rows.item(i).descricao + "</td><td><a href='#' onclick='Banco.excluir(" + results.rows.item(i).id + ")'>Excluir</a></td></tr>";

                }
            }, null);
        });

        Banco.atualizaCards();


    },

    atualizaCards() {
        //alert('chamou atualiza cards');
        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);
        // atualiza cards
        sql2 = "select distinct DATETIME('now','localtime') as hi, l.id as id_linha, l.nome as nome_linha, l.valor, m.nome as nome_maquina, cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real) as duracao from parada p inner join maquina m on p.id_maquina = m.id inner join tipo_parada tp on p.id_tipo_parada = tp.id inner join linha_maquina lm on lm.id_maquina = m.id  and lm.id_linha = l.id inner join linha l on lm.id_linha = l.id where DATETIME('now','localtime') between DATETIME(p.dt_inicio) and DATETIME(p.dt_fim) order by l.id, m.id, p.id asc;";
        //alert(sql2);

        db.transaction(function (tx) {
            tx.executeSql(sql2, [], function (tx, results) {
                var len = results.rows.length, i;

                //var tableRef = document.getElementById('data-table').getElementsByTagName('tbody')[0];
                //tableRef.innerHTML="";
                maquinas = "";
                linhas = "";
                valor = 0;
                linhaAnt = "";

                for (i = 0; i < len; i++) {

                    //var newRow = tableRef.insertRow(tableRef.rows.length);
                    //newRow.innerHTML += "<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).nome_linha+"</td><td>"+results.rows.item(i).nome_maquina+"</td><td>"+results.rows.item(i).tipo_parada+"</td><td>"+results.rows.item(i).dt_inicio+"</td><td>"+results.rows.item(i).dt_fim+"</td><td>"+results.rows.item(i).descricao+"</td><td><a href='#' onclick='Banco.excluir("+results.rows.item(i).id+")'>Excluir</a></td></tr>";
                    //alert('linha parada atualmente:\n' + results.rows.item(i).id_linha + '\n' + results.rows.item(i).nome_linha + '\n' + results.rows.item(i).valor + '\n' + results.rows.item(i).duracao+ '\n' + results.rows.item(i).hi);

                    if (linhaAnt != results.rows.item(i).nome_linha) {
                        linhas = linhas + results.rows.item(i).nome_linha + "<br>";
                        valor = valor + (results.rows.item(i).valor * results.rows.item(i).duracao);
                    }

                    maquinas = maquinas + results.rows.item(i).nome_maquina + "<BR>";

                    linhaAnt = results.rows.item(i).nome_linha;

                }
                document.getElementById('linhasEnvolvidas').innerHTML = linhas;
                document.getElementById('maquinasEnvolvidas').innerHTML = maquinas;
                document.getElementById('custoEnvolvido').innerHTML = valor.toFixed(2);

            }, null);
        });

    },

    salvar() {

        let id_maquina = document.getElementById('id_maquina').value;
        let id_tipo_parada = document.getElementById('id_tipo_parada').value;
        let dt_inicio = document.getElementById('dt_inicio').value;
        let dt_fim = document.getElementById('dt_fim').value;
        let descricao = document.getElementById('descricao').value;

        errMsg = "";

        if (id_maquina == "") {
            errMsg += "<li>Selecione a Linha/Máquina</li>";
        }

        if (id_tipo_parada == "") {
            errMsg += "<li>Selecione o Tipo de Parada</li>";
        }

        if (dt_inicio == "") {
            errMsg += "<li>Informe a data e hora de início</li>";
        }

        if (dt_fim == "") {
            errMsg += "<li>Informe a data e hora final</li>";
        }

        if (descricao == "" || descricao.length < 5) {
            errMsg += "<li>Descreva a parada</li>";
        }

        if (errMsg != "") {
            Swal.fire({
                title: '<strong>Algo deu errado</strong>',
                icon: 'error',
                html:
                    '<ul>' + errMsg + '</ul>',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false
            })
            return;
        }

        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            let xsql = 'insert into parada (id_maquina, id_tipo_parada, dt_inicio, dt_fim, descricao) values(' + id_maquina + ',' + id_tipo_parada + ',\'' + dt_inicio + '\',\'' + dt_fim + '\',\'' + descricao + '\');';
            //alert(xsql);
            tx.executeSql(xsql);
        });

        Swal.fire({
            icon: 'success',
            title: 'Parada salva com sucesso!',
            showConfirmButton: false,
            timer: 5500
        });

        document.querySelector('.modal-overlay').classList.remove('active');
        Banco.lerParadas();

    },
    excluir(id_parada) {

        Swal.fire({
            title: 'Confirma a exclusão?',
            text: "Você não poderá reverter a exclusão.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, exclua!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);
                db.transaction(function (tx) {
                    let xsql = 'delete from parada where id=' + id_parada;
                    //alert(xsql);
                    tx.executeSql(xsql);
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Parada excluída com sucesso!',
                    showConfirmButton: false,
                    timer: 2500
                });

                Banco.lerParadas();
            }
        })
    },
    filtrar() {


        mydataset = [];
        labelAgrupador = [];

        inicio = document.getElementById('inicio').value;
        fim = document.getElementById('fim').value;

        if (document.getElementById('agrupador').value == 'turno') {
            labelAgrupador = ['Manhã', 'Tarde', 'Noite', 'Madrugada'];


            //loop turno
            var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);
            sql2 = "select * from tipo_parada;"

            db.transaction(function (tx) {
                tx.executeSql(sql2, [], function (tx, results) {
                    var len = results.rows.length, i;

                    for (i = 0; i < len; i++) {

                        //alert(results.rows.item(i).nome + '\n' + results.rows.item(i).hora_inicio + '\n' + results.rows.item(i).hora_fim);

                        tipo_parada = results.rows.item(i).nome;

                        var mydata = [];
                        var obj = {
                            label: tipo_parada,
                            borderColor: results.rows.item(i).cor,
                            backgroundColor: results.rows.item(i).cor,
                            data: '',
                        }
                        obj.data = mydata;
                        mydataset.push(obj);
                        //console.log(JSON.stringify(mydataset));



                        //loop tipo parada

                        /**** */
                        //turno_nome,turno_inicio, turno_fim
                        function nivelTurno(tipo_parada) {
                            sql3 = "select * from turno;"
                            db.transaction(function (tx3) {
                                tx3.executeSql(sql3, [], function (tx3, rs3) {
                                    var rs3len = rs3.rows.length, j;


                                    for (j = 0; j < rs3len; j++) {

                                        //alert(rs3.rows.item(i).nome);


                                        turno_nome = rs3.rows.item(j).nome;
                                        turno_inicio = rs3.rows.item(j).hora_inicio;
                                        turno_fim = rs3.rows.item(j).hora_fim;

                                        //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada);



                                        sql4 = "select sum(cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real)) as duracao from parada p inner join tipo_parada tp on p.id_tipo_parada = tp.id where tp.nome='" + tipo_parada + "' and p.dt_inicio >= DATETIME('" + inicio + "') and p.dt_fim <= DATETIME('" + fim + "') and time(p.dt_inicio) >= time('2021-03-21 " + turno_inicio + "') and time(p.dt_fim) <= time('2021-03-21 " + turno_fim + "');";

                                        //sql4 = "select time('2021-03-21 " + turno_fim + "') as duracao from parada p";
                                        //sql4 = "select sum(cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real)) as duracao from parada p";

                                        function consultaFinal(turno_nome, turno_inicio, turno_fim, tipo_parada, sql4) {

                                            db.transaction(function (tx4) {
                                                tx4.executeSql(sql4, [], function (tx4, rs4) {
                                                    var rs4len = rs4.rows.length, k;


                                                    for (k = 0; k < rs4len; k++) {
                                                        duracao = rs4.rows.item(k).duracao;
                                                    }
                                                    if (duracao == null) {
                                                        duracao = 0;
                                                    } else {
                                                        duracao = parseInt(duracao);
                                                    }

                                                    //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada + '\n' + duracao );

                                                    //console.log(JSON.stringify(mydataset));
                                                    //mydataset[tipo_parada].data.push(duracao);
                                                    for (var i = 0; i < mydataset.length; i++) {
                                                        if (mydataset[i].label == tipo_parada) {
                                                            //alert(mydataset[i].label);
                                                            mydataset[i].data.push(duracao);
                                                        }
                                                    }
                                                    /*
                                                    for (var i = 0; i < mydataset.length; i++){
                                                        document.write("<br><br>array index: " + i);
                                                        var obj = mydataset[i];
                                                        for (var key in obj){
                                                          var value = obj[key];
                                                          console.log("------->" + key + ": " + value);
                                                          if (key=='data'){
                                                            obj[key].push(duracao);
                                                          }
                                                        }
                                                    }*/




                                                });
                                            });
                                        }
                                        consultaFinal(turno_nome, turno_inicio, turno_fim, tipo_parada, sql4);


                                    }
                                    //
                                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                                }, null);
                            });
                        }

                        nivelTurno(tipo_parada);

                        /**** */


                    }
                    //
                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                }, null);
            });

        } // agrupador == turno

        // por dia
        if (document.getElementById('agrupador').value == 'dia') {


            var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

            sqldia = "select distinct strftime('%Y-%m-%d',dt_inicio) as dt from parada where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "') order by strftime('%Y-%m-%d',dt_inicio);"

            db.transaction(function (tx) {
                tx.executeSql(sqldia, [], function (tx, rs1) {
                    var len = rs1.rows.length, i;

                    for (i = 0; i < len; i++) {
                        labelAgrupador.push(rs1.rows.item(i).dt);
                    }
                })
            })


            //loop turno

            sql2 = "select * from tipo_parada;"

            db.transaction(function (tx) {
                tx.executeSql(sql2, [], function (tx, results) {
                    var len = results.rows.length, i;

                    for (i = 0; i < len; i++) {

                        //alert(results.rows.item(i).nome + '\n' + results.rows.item(i).hora_inicio + '\n' + results.rows.item(i).hora_fim);

                        tipo_parada = results.rows.item(i).nome;

                        var mydata = [];
                        var obj = {
                            label: tipo_parada,
                            borderColor: results.rows.item(i).cor,
                            backgroundColor: results.rows.item(i).cor,
                            data: '',
                        }
                        obj.data = mydata;
                        mydataset.push(obj);
                        //console.log(JSON.stringify(mydataset));



                        //loop tipo parada

                        /**** */
                        //turno_nome,turno_inicio, turno_fim
                        function nivelDia(tipo_parada) {
                            sql3 = "select distinct strftime('%Y-%m-%d',dt_inicio) as dia from parada where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "');"
                            db.transaction(function (tx3) {
                                tx3.executeSql(sql3, [], function (tx3, rs3) {
                                    var rs3len = rs3.rows.length, j;


                                    for (j = 0; j < rs3len; j++) {

                                        //alert(rs3.rows.item(i).nome);


                                        dia = rs3.rows.item(j).dia;

                                        //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada);



                                        sql4 = "select ifnull(sum(cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real)),0) as duracao from parada p inner join tipo_parada tp on p.id_tipo_parada = tp.id where tp.nome='" + tipo_parada + "' and strftime('%Y-%m-%d',p.dt_inicio) = strftime('%Y-%m-%d',DATETIME('" + dia + "'));";

                                        //console.log('sql4');
                                        //console.log(sql4);

                                        function consultaFinal(dia, tipo_parada, sql4) {

                                            db.transaction(function (tx4) {
                                                tx4.executeSql(sql4, [], function (tx4, rs4) {
                                                    var rs4len = rs4.rows.length, k;


                                                    for (k = 0; k < rs4len; k++) {
                                                        duracao = rs4.rows.item(k).duracao;
                                                    }
                                                    if (duracao == null) {
                                                        duracao = 0;
                                                    } else {
                                                        duracao = parseInt(duracao);
                                                    }

                                                    //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada + '\n' + duracao );

                                                    //console.log(JSON.stringify(mydataset));
                                                    //mydataset[tipo_parada].data.push(duracao);
                                                    for (var i = 0; i < mydataset.length; i++) {
                                                        if (mydataset[i].label == tipo_parada) {
                                                            //alert(mydataset[i].label);
                                                            mydataset[i].data.push(duracao);
                                                        }
                                                    }
                                                    /*
                                                    for (var i = 0; i < mydataset.length; i++){
                                                        document.write("<br><br>array index: " + i);
                                                        var obj = mydataset[i];
                                                        for (var key in obj){
                                                          var value = obj[key];
                                                          console.log("------->" + key + ": " + value);
                                                          if (key=='data'){
                                                            obj[key].push(duracao);
                                                          }
                                                        }
                                                    }*/




                                                });
                                            });
                                        }
                                        consultaFinal(dia, tipo_parada, sql4);


                                    }
                                    //
                                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                                }, null);
                            });
                        }

                        nivelDia(tipo_parada);

                        /**** */


                    }
                    //
                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                }, null);
            });
        }

        // por Mês
        if (document.getElementById('agrupador').value == 'mes') {


            var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

            sqlmes = "select distinct strftime('%Y-%m',dt_inicio) as mes from parada where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "') order by strftime('%Y-%m',dt_inicio);";

            db.transaction(function (tx) {
                tx.executeSql(sqlmes, [], function (tx, rs1) {
                    var len = rs1.rows.length, i;

                    for (i = 0; i < len; i++) {
                        labelAgrupador.push(rs1.rows.item(i).mes);
                    }
                })
            })


            //loop turno

            sql2 = "select * from tipo_parada;";

            db.transaction(function (tx) {
                tx.executeSql(sql2, [], function (tx, results) {
                    var len = results.rows.length, i;

                    for (i = 0; i < len; i++) {

                        //alert(results.rows.item(i).nome + '\n' + results.rows.item(i).hora_inicio + '\n' + results.rows.item(i).hora_fim);

                        tipo_parada = results.rows.item(i).nome;

                        var mydata = [];
                        var obj = {
                            label: tipo_parada,
                            borderColor: results.rows.item(i).cor,
                            backgroundColor: results.rows.item(i).cor,
                            data: '',
                        }
                        obj.data = mydata;
                        mydataset.push(obj);
                        //console.log(JSON.stringify(mydataset));



                        //loop tipo parada

                        /**** */
                        //turno_nome,turno_inicio, turno_fim
                        function nivelMes(tipo_parada) {
                            sqlNivelMes = "select distinct strftime('%Y-%m',dt_inicio) as mes from parada where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "') order by strftime('%Y-%m',dt_inicio);";
                            db.transaction(function (tx3) {
                                tx3.executeSql(sqlNivelMes, [], function (tx3, rs4) {
                                    var rs4len = rs4.rows.length, j;


                                    for (j = 0; j < rs4len; j++) {

                                        mes = rs4.rows.item(j).mes;

                                        sql4 = "select ifnull(sum(cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real)),0) as duracao from parada p inner join tipo_parada tp on p.id_tipo_parada = tp.id where tp.nome='" + tipo_parada + "' and strftime('%Y-%m',p.dt_inicio) = strftime('%Y-%m',DATETIME('" + mes + "-01'));";

                                        //console.log('sql4');
                                        //console.log(sql4);

                                        function consultaFinal(mes, tipo_parada, sql4) {

                                            db.transaction(function (tx4) {
                                                tx4.executeSql(sql4, [], function (tx4, rs4) {
                                                    var rs4len = rs4.rows.length, k;


                                                    for (k = 0; k < rs4len; k++) {
                                                        duracao = rs4.rows.item(k).duracao;
                                                    }
                                                    if (duracao == null) {
                                                        duracao = 0;
                                                    } else {
                                                        duracao = parseInt(duracao);
                                                    }

                                                    //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada + '\n' + duracao );

                                                    //console.log(JSON.stringify(mydataset));
                                                    //mydataset[tipo_parada].data.push(duracao);
                                                    for (var i = 0; i < mydataset.length; i++) {
                                                        if (mydataset[i].label == tipo_parada) {
                                                            //alert(mydataset[i].label);
                                                            mydataset[i].data.push(duracao);
                                                        }
                                                    }
                                                    /*
                                                    for (var i = 0; i < mydataset.length; i++){
                                                        document.write("<br><br>array index: " + i);
                                                        var obj = mydataset[i];
                                                        for (var key in obj){
                                                          var value = obj[key];
                                                          console.log("------->" + key + ": " + value);
                                                          if (key=='data'){
                                                            obj[key].push(duracao);
                                                          }
                                                        }
                                                    }*/




                                                });
                                            });
                                        }
                                        consultaFinal(mes, tipo_parada, sql4);


                                    }
                                    //
                                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                                }, null);
                            });
                        }

                        nivelMes(tipo_parada);

                        /**** */


                    }
                    //
                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                }, null);
            });
        }

        // por linha
        if (document.getElementById('agrupador').value == 'linha') {

            var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

            sqlLinha = "select distinct nome as linha from 	parada p 	inner join 	linha_maquina lm	on lm.id_maquina = p.id_maquina 	inner join 	linha l	on l.id = lm.id_linha where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "');";

            db.transaction(function (tx) {
                tx.executeSql(sqlLinha, [], function (tx, rs1) {
                    var len = rs1.rows.length, i;

                    for (i = 0; i < len; i++) {
                        //alert(rs1.rows.item(i).linha);
                        labelAgrupador.push(rs1.rows.item(i).linha);
                    }
                })
            })


            //loop turno

            sql2 = "select * from tipo_parada;";

            db.transaction(function (tx) {
                tx.executeSql(sql2, [], function (tx, results) {
                    var len = results.rows.length, i;

                    for (i = 0; i < len; i++) {

                        //alert(results.rows.item(i).nome + '\n' + results.rows.item(i).hora_inicio + '\n' + results.rows.item(i).hora_fim);

                        tipo_parada = results.rows.item(i).nome;

                        var mydata = [];
                        var obj = {
                            label: tipo_parada,
                            borderColor: results.rows.item(i).cor,
                            backgroundColor: results.rows.item(i).cor,
                            data: '',
                        }
                        obj.data = mydata;
                        mydataset.push(obj);
                        //console.log(JSON.stringify(mydataset));



                        //loop tipo parada

                        /**** */
                        //turno_nome,turno_inicio, turno_fim
                        function nivelLinha(tipo_parada) {
                            sqlNivelLinha = "select distinct nome as linha from 	parada p 	inner join 	linha_maquina lm	on lm.id_maquina = p.id_maquina 	inner join 	linha l	on l.id = lm.id_linha where dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "');";
                            db.transaction(function (tx3) {
                                tx3.executeSql(sqlNivelLinha, [], function (tx3, rs4) {
                                    var rs4len = rs4.rows.length, j;


                                    for (j = 0; j < rs4len; j++) {

                                        linha = rs4.rows.item(j).linha;

                                        sql4 = "select ifnull(sum(cast((JulianDay(p.dt_fim) - JulianDay(p.dt_inicio)) * 24 as Real)),0) as duracao from parada p inner join tipo_parada tp on p.id_tipo_parada = tp.id where tp.nome='" + tipo_parada + "' and dt_inicio>=DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "') and p.id_maquina in (select lm.id_maquina from 	parada p 	inner join 	linha_maquina lm	on lm.id_maquina = p.id_maquina 	inner join 	linha l	on l.id = lm.id_linha where l.nome='" + linha + "' and dt_inicio >= DATETIME('" + inicio + "') and dt_fim <= DATETIME('" + fim + "'));";

                                        //console.log('sql4');
                                        //console.log(sql4);

                                        function consultaFinal(linha, tipo_parada, sql4) {

                                            //alert(sql4);

                                            db.transaction(function (tx4) {
                                                tx4.executeSql(sql4, [], function (tx4, rs4) {
                                                    var rs4len = rs4.rows.length, k;


                                                    for (k = 0; k < rs4len; k++) {
                                                        duracao = rs4.rows.item(k).duracao;
                                                    }
                                                    if (duracao == null) {
                                                        duracao = 0;
                                                    } else {
                                                        duracao = parseInt(duracao);
                                                    }
                                                    //alert(duracao);

                                                    //alert(turno_nome + '\n' + turno_inicio + '\n' + turno_fim + '\n' + tipo_parada + '\n' + duracao );

                                                    //console.log(JSON.stringify(mydataset));
                                                    //mydataset[tipo_parada].data.push(duracao);
                                                    for (var i = 0; i < mydataset.length; i++) {
                                                        if (mydataset[i].label == tipo_parada) {
                                                            //alert(mydataset[i].label);
                                                            mydataset[i].data.push(duracao);
                                                        }
                                                    }
                                                    /*
                                                    for (var i = 0; i < mydataset.length; i++){
                                                        document.write("<br><br>array index: " + i);
                                                        var obj = mydataset[i];
                                                        for (var key in obj){
                                                          var value = obj[key];
                                                          console.log("------->" + key + ": " + value);
                                                          if (key=='data'){
                                                            obj[key].push(duracao);
                                                          }
                                                        }
                                                    }*/

                                                });
                                            });
                                        }
                                        consultaFinal(linha, tipo_parada, sql4);


                                    }
                                    //
                                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                                }, null);
                            });
                        }

                        nivelLinha(tipo_parada);

                        /**** */


                    }
                    //
                    //document.getElementById('linhasEnvolvidas').innerHTML = linhas;


                }, null);
            });
        }


        function criarGrafico() {
            //alert("chamou criarGrafico");
            //Gráfico 1 - Tickets Abertos Como
            var ctx = document.getElementById('myChart').getContext('2d');
            if (window.bar != undefined) {
                window.bar.destroy();
            }

            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: labelAgrupador,
                    datasets: mydataset,
                    /*[
                        {
                        label: 'Preventiva',
                        borderColor: 'green',
                        backgroundColor: 'green',
                        data: [10,5,16]
                        },
                        {
                        label: 'Corretiva',
                        borderColor: 'red',
                        backgroundColor: 'red',
                        data: [3,1,2]
                        },                    
                ]*/
                },

                // Configuration options go here
                options: {
                    animation: false,
                    title: {
                        display: false,
                        text: ''
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        }
        setTimeout(function () { criarGrafico(); }, 4000);

    } // filtrar



}

const Modal = {
    open() {
        // Abrir modal
        // Adicionar a class active ao modal

        // preenchendo select linha / máquina

        document.getElementById('id_maquina').options.length = 0;

        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

        sql = "select l.nome as nome_linha, m.id as id_maquina, m.nome as nome_maquina  from linha l inner join linha_maquina lm on l.id = lm.id_linha inner join maquina m on lm.id_maquina = m.id  order by l.nome, m.nome;";

        db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
                var len = results.rows.length, i;

                for (i = 0; i < len; i++) {

                    document.getElementById('id_maquina').options[document.getElementById('id_maquina').options.length] = new Option(results.rows.item(i).nome_linha + ' - ' + results.rows.item(i).nome_maquina, results.rows.item(i).id_maquina);

                }
            }, null);
        });

        // preenchendo select tipo parada
        document.getElementById('id_tipo_parada').options.length = 0;

        var db = openDatabase('paradas', '1.0', 'Test DB', 2 * 1024 * 1024);

        sql2 = "select * from tipo_parada order by nome;";

        db.transaction(function (tx) {
            tx.executeSql(sql2, [], function (tx, rs2) {
                var len = rs2.rows.length, i;

                for (i = 0; i < len; i++) {

                    document.getElementById('id_tipo_parada').options[document.getElementById('id_tipo_parada').options.length] = new Option(rs2.rows.item(i).nome, rs2.rows.item(i).id);

                }
            }, null);
        });


        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        // Fechar o modal
        //Remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Utils = {

    formatAmount(value) {

        //Outra maneira utilizando regex
        // value = Number(value.replace(/\,\./g,"")) * 100
        value = Number(value) * 100
        return value

    },

    formatDate(date) {
        const splittedDate = date.split('-')

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const App = {
    init() {
        Banco.lerParadas();
    }
}

App.init()








