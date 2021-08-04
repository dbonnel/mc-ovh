<form id="mcs-form" accept-charset="UTF-8" action="" method="get" name="coefficients_bezout">D'après le théorème de Bézout, quels que soient les entiers naturels <span class="maths"><i>a</i></span> et <span class="maths"><i>b</i></span> il existe deux entiers relatifs <span class="maths"><i>u</i></span> et <span class="maths"><i>v</i></span> tels que:
<p class="center"><i>a</i><i>u</i> + <i>b</i><i>v</i> = PGCD(<i>a;b</i>)</p>

Cet outil permet de calculer le PGCD de <span class="maths"><i>a</i></span> et <span class="maths"><i>b</i></span> puis les entiers <span class="maths"><i>u</i></span> et <span class="maths"><i>v</i></span> à l'aide de l'algorithme d'Euclide.

Si vous souhaitez progresser, <strong>faites vous-même vos calculs</strong> et utilisez cet outil pour vérifier !
<table id="calcul" class="noborder" style="text-align: left;">
<tr>
<td class="form-item"><label style="display: inline;" for="a">   a : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="a" size="10" type="text" value="<?=__('a')?>"  data-varname="a" /></td>
<td class="form-item"><label style="display: inline;" for="b">   b : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="b" size="10" type="text" value="<?=__('b')?>" data-varname="b" /></td>
<td class="form-item">&nbsp;<br>
<input id="mcs-submit" class="bouton" name="op" type="submit" value="Envoyer" /></td>
</tr>

</table>
</form>


<?=__('result')?>