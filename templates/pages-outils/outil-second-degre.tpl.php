<form name="second_degre" id="mcs-form" accept-charset="UTF-8" action="/solver/outil-equation-du-2nd-degre" method="get">Cet outil permet de résoudre des équations du type <span class="mc-katex">ax^2+bx+c = 0</span> lorsque <span class="mc-katex">a, b</span> et <span class="mc-katex">c</span> sont des <strong>entiers</strong> relatifs.<p></p>
<p>Utilisez-le pour vérifier vos solutions et éventuellement comprendre vos erreurs.<br>
Si vous souhaitez progresser, <strong>faites vous-même vos calculs</strong> avant d'utiliser cet outil !</p>
<table id="calcul" class="noborder" style="text-align: left;">
<tbody>
<tr>
<td class="form-item"><label style="display: inline;" for="a">   a : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="a" size="10" type="text" value="<?= __('a') ?>"  data-varname="a" /></td>
<td class="form-item"><label style="display: inline;" for="b">   b : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="b" size="10" type="text" value="<?= __('b') ?>" data-varname="b" /></td>
<td class="form-item"><label style="display: inline;" for="c">   c : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="c" size="10" type="text" value="<?= __('c') ?>" data-varname="c" /></td>
<td class="form-item">&nbsp;<br />
<input id="mcs-submit" class="form-submit" style="display: inline; padding:5px 10px;" name="op" type="submit" value="Envoyer" /></td>
</tr>

</tbody>
</table>
</form>
<?=__('result')?>