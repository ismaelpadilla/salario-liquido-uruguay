# Salario líquido uruguay

![Versión](https://img.shields.io/github/package-json/v/ismaelpadilla/salario-liquido-uruguay?label=versi%C3%B3n)
![Build y test](https://github.com/ismaelpadilla/salario-liquido-uruguay/workflows/Build%20y%20test/badge.svg)

✔Actualizado para el 2023.

----

Simulador para calcular el salario líquido en Uruguay, actualmente publicado en https://salarioliquidouruguay.com/

En la actualidad, hay varios problemas con los simuladores oficiales existentes. Por ejemplo, tanto el [simulador de aportes de BPS](https://app1.bps.gub.uy/AcercaSimuladorCalculosWeb/paginas/simuladorPersona/otras/ingresoDatosIC.jsf) como los [simuladores de IRPF de DGI](https://www.dgi.gub.uy/wdgi/page?2,principal,dgi--herramientas--simuladores--irpf--2020,O,es,0,) no manejan correctamente las distintas franjas del FONASA. Otros simuladores no oficiales que he encontrado parecen no estar actualizados.

## ¿Cómo se calcula el salario líquido?

Los dos principales tipos de impuestos a tener en cuenta son los aportes a BPS y el IRPF.

### Aportes a BPS

Los aportes a realizar son:

- [Aportes jubilatorios](https://www.bps.gub.uy/10305/aporte-jubilatorio.html): 15% del salario.
- [FONASA](https://www.bps.gub.uy/10310/fondo-nacional-de-salud-fonasa.html): 4,5% en la mayoría de los casos, pero la tasa varía si se tiene remuneración menor a 2,5 BPC, y según se tengan hijos o cónyuges a cargo.
- [FRL](https://www.bps.gub.uy/10322/fondo-reconversion-laboral-frl.html): 0,10% del salario.

### IRPF

El IRPF es el impuesto con el que la guente suele tener más problemas a la hora de calcularlo. Se aplican diferentes tasas sobre las diferentes franjas del salario, donde las franjas son:

| Desde    | Hasta     | Tasa  |
| -------: |----------:| -----:|
| 0 BPC    | 7 BPC     | 0%    |
| 7 BPC    | 10 BPC    | 10%   |
| 10 BPC   | 15 BPC    | 15%   |
| 15 BPC   | 30 BPC    | 24%   |
| 30 BPC   | 50 BPC    | 25%   |
| 50 BPC   | 75 BPC    | 27%   |
| 75 BPC   | 115 BPC   | 31%   |
| 115 BPC  | ---       | 36%   |

Contrario a creencia popular, no se cobra el impuesto correspondiente a la franja más alta sobre todo el salario, si no que se aplican diferentes tasas a la porción de salario que está dentro de cada franja.

Por ejemplo, si el salario nominal es de $60.000, y el BPC es $5164 (valor de 2022), el impuesto que se cobra es:

- 0% sobre la porción del salario que cae entre la franja 0 y 7 BPC (impuesto de 0% sobre $36.148-$0=$36.148 del salario -> $0).
- 7% sobre la porción del salario que cae entre la franja 7 y 10 BPC (impuesto de 10% sobre $51.640-$36.148=$15.492 del salario -> $1.549).
- 15% sobre la porción del salario que cae entre la franja 10 y 15 BPC (impuesto de 15% sobre $77.460-$51.640=$11.960 del salario -> $1.794).

El IPRF (antes de aplicar las [deducciones correspondientes](https://www.dgi.gub.uy/wdgi/page?2,principal,_Ampliacion,O,es,0,PAG;CONC;40;1;D;cuales-son-las-deducciones-personales-admitidas-en-la-liquidacion-del-irpf-33486;5;PAG;)), sería entonces $3.343.

## Cómo reportar errores

Los errores en los cálculos, así como cualquier otro problema en la aplicación o esta documentación, pueden reportarse de dos maneras:

- (Recomendado) Creando una *issue* en GitHub ([link](https://github.com/ismaelpadilla/salario-liquido-uruguay/issues/new)).
- Reportando los errores por correo electrónico ([link](mailto:padillaismael92@gmail.com)).
