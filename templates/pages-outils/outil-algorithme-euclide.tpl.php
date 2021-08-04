<form id="mcs-form" accept-charset="UTF-8" action="" method="post" name="algorithme-euclide"><p>Cet outil permet de calculer le PGCD de deux entiers naturels non nuls a et b à l'aide de l'algorithme d'Euclide.</p><p> La méthode de calcul est détaillée sur cette fiche : <a href="/methode/algorithme-euclide-tx/">Algorithme d'Euclide</a>. </p><p> 

Si vous souhaitez progresser, <strong>faites vous-même vos calculs</strong> et utilisez cet outil pour vérifier !</p> 
<table id="calcul" class="noborder" style="text-align: left;">
<tr>
<td class="form-item"><label style="display: inline;" for="a">   a : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="a" size="10" type="text" value="<?= __('a') ?>"  data-varname="a" /></td>
<td class="form-item"><label style="display: inline;" for="b">   b : </label><br />
<input style="display: inline;width:60%; padding:5px 10px;" class="mcs-var" maxlength="5" name="b" size="10" type="text" value="<?= __('b') ?>" data-varname="b" /></td>
<td class="form-item">&nbsp;<br>
<input id="mcs-submit" class="bouton" name="op" type="submit" value="Envoyer" /></td>
</tr>

</table>
</form>


<?=__('result')?>