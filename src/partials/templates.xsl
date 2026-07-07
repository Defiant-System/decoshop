<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="blank-view">
	<h2>Welcome to Decoshop.</h2>

	<div class="block-buttons">
		<div class="btn" data-click="open-filesystem">
			<i class="icon-folder-open"></i>
			Open&#8230;
		</div>

		<div class="btn disabled_" data-click="new-from-clipboard">
			<i class="icon-clipboard"></i>
			From clipboard
		</div>

		<div class="btn" data-click="close-view">
			<i class="icon-chevron"></i>
			Go back
		</div>
	</div>

	<div class="block-presets" data-click="select-preset">
		<h3>Presets</h3>
		<xsl:call-template name="preset-list" />
	</div>

	<div class="block-samples" data-click="select-sample">
		<h3>Example</h3>
		<xsl:call-template name="sample-list" />
	</div>

	<xsl:if test="count(./Recents/*) &gt; 0">
		<div class="block-recent" data-click="select-recent-file">
			<h3>Recent</h3>
			<xsl:call-template name="recent-list" />
		</div>
	</xsl:if>
</xsl:template>


<xsl:template name="preset-list">
	<xsl:for-each select="./Presets/*">
		<div class="preset">
			<xsl:attribute name="data-width"><xsl:value-of select="@width"/></xsl:attribute>
			<xsl:attribute name="data-height"><xsl:value-of select="@height"/></xsl:attribute>
			<xsl:attribute name="data-bg"><xsl:value-of select="@bg"/></xsl:attribute>
			<xsl:if test="@icon = 'folder-open'">
				<xsl:attribute name="class">preset fs-open</xsl:attribute>
			</xsl:if>
			<i>
				<xsl:attribute name="class">icon-<xsl:value-of select="@icon"/></xsl:attribute>
			</i>
			<h4><xsl:value-of select="@name"/></h4>
			<xsl:if test="@bg-name">
				<h5><xsl:value-of select="@bg-name"/>, <xsl:value-of select="@width"/>x<xsl:value-of select="@height"/> pixels</h5>
			</xsl:if>
		</div>
	</xsl:for-each>
</xsl:template>


<xsl:template name="sample-list">
	<xsl:for-each select="./Samples/*">
		<div class="sample">
			<xsl:attribute name="style">background-image: url(<xsl:value-of select="@path"/>);</xsl:attribute>
			<xsl:attribute name="data-url"><xsl:value-of select="@path"/></xsl:attribute>
			<span class="sample-kind"><xsl:call-template name="substring-after-last">
				<xsl:with-param name="string" select="@path" />
				<xsl:with-param name="delimiter" select="'.'" />
			</xsl:call-template></span>
		</div>
	</xsl:for-each>
</xsl:template>


<xsl:template name="recent-list">
	<xsl:for-each select="./Recents/*">
		<div class="recent-file">
			<xsl:attribute name="data-file"><xsl:value-of select="@filepath"/></xsl:attribute>
			<span class="thumbnail">
				<xsl:attribute name="style">background-image: url(<xsl:value-of select="@filepath"/>);</xsl:attribute>
			</span>
			<span class="name"><xsl:value-of select="@name"/></span>
		</div>
	</xsl:for-each>
</xsl:template>


<xsl:template name="memory-files-list">
	<div class="list-head">
		<span class="cell-3">Name</span>
		<span class="cell-4">RAM</span>
		<span class="cell-5">GPU</span>
	</div>
	<div class="list-body">
		<xsl:for-each select="./*">
			<xsl:call-template name="memory-files-list-row"/>
		</xsl:for-each>
	</div>
	<div class="list-foot">
		<span class="cell-3">Total</span>
		<span class="cell-4">
			<xsl:call-template name="file-size">
				<xsl:with-param name="bytes" select="sum(.//@ram)" />
			</xsl:call-template>
		</span>
		<span class="cell-5">
			<xsl:call-template name="file-size">
				<xsl:with-param name="bytes" select="sum(.//@gpu)" />
			</xsl:call-template>
		</span>
	</div>
</xsl:template>


<xsl:template name="memory-files-list-row">
	<xsl:choose>
		<xsl:when test="@type = 'file'">
			<div class="file">
				<div class="row expanded">
					<i class="icon icon-chevron" data-click="toggle-child-rows"></i>
					<i class="icon icon-new"></i>
					<span class="cell-3"><xsl:value-of select="@name"/></span>
					<span class="cell-4">
						<xsl:call-template name="file-size">
							<xsl:with-param name="bytes" select="sum(.//@ram)" />
						</xsl:call-template>
					</span>
					<span class="cell-5">
						<xsl:call-template name="file-size">
							<xsl:with-param name="bytes" select="sum(.//@gpu)" />
						</xsl:call-template>
					</span>
				</div>
				<div class="children">
					<xsl:for-each select="./*">
						<xsl:call-template name="memory-files-list-row"/>
					</xsl:for-each>
				</div>
			</div>
		</xsl:when>
		<xsl:when test="@type = 'layer'">
			<div class="item">
				<div class="row">
					<i><xsl:attribute name="class">icon 
						<xsl:choose>
							<xsl:when test="@icon"><xsl:value-of select="@icon"/></xsl:when>
							<xsl:otherwise>icon-image</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute></i>
					<span class="cell-3"><xsl:value-of select="@name"/></span>
					<span class="cell-4">
						<xsl:call-template name="file-size">
							<xsl:with-param name="bytes" select="@ram" />
						</xsl:call-template>
					</span>
					<span class="cell-5">
						<xsl:call-template name="file-size">
							<xsl:with-param name="bytes" select="@gpu" />
						</xsl:call-template>
					</span>
				</div>
			</div>
		</xsl:when>
	</xsl:choose>
</xsl:template>


<xsl:template name="file-size">
	<xsl:param name="bytes"/>
	<xsl:param name="kind"/>
	<xsl:choose>
		<xsl:when test="$kind = '_dir'">--</xsl:when>
		<xsl:when test="format-number($bytes div 1024, '0') = 0"><xsl:value-of select="$bytes"/> bytes</xsl:when>
		<xsl:when test="format-number($bytes div 1073741824, '###0.000') &gt;= 1"><xsl:value-of select="format-number($bytes div 1073741824, '###0.0')"/> GB</xsl:when>
		<xsl:when test="format-number($bytes div 1048576, '###0.000') &gt;= 1"><xsl:value-of select="format-number($bytes div 1048576, '###0.0')"/> MB</xsl:when>
		<xsl:otherwise><xsl:value-of select="format-number($bytes div 1048576, '###0.0')"/> MB</xsl:otherwise>
		<!-- <xsl:otherwise><xsl:value-of select="format-number($bytes div 1024, '###0')"/> KB</xsl:otherwise> -->
	</xsl:choose>
</xsl:template>


<xsl:template name="history-list">
	<div>
		<xsl:for-each select="./*">
			<xsl:call-template name="history-list-row"/>
		</xsl:for-each>
	</div>
</xsl:template>


<xsl:template name="history-list-row">
	<div class="item">
		<i>
			<xsl:attribute name="class">icon 
				<xsl:value-of select="@icon"/>
			</xsl:attribute>
		</i>
		<span><xsl:value-of select="@name"/></span>
	</div>
</xsl:template>


<xsl:template name="channels-list">
	<div class="box-content-list" data-click="select-channel">
		<xsl:for-each select="./*">
			<xsl:call-template name="channels-list-row"/>
		</xsl:for-each>
	</div>
</xsl:template>


<xsl:template name="channels-list-row">
	<div class="row" data-layer="image">
		<xsl:attribute name="data-id"><xsl:value-of select="@id"/></xsl:attribute>
		<xsl:attribute name="style">
			--w: <xsl:value-of select="@w"/>px;
			--h: <xsl:value-of select="@h"/>px;
		</xsl:attribute>
		<div class="layer-row-body">
			<div class="thumbnail">
				<canvas></canvas>
				<i></i>
			</div>
			<div class="name"><xsl:value-of select="@name"/></div>
			<i class="icon icon-eye-on"></i>
		</div>
	</div>
</xsl:template>


<xsl:template name="layers-list">
	<div class="box-content-list" data-click="select-layer">
		<xsl:for-each select="./*">
			<xsl:call-template name="layers-list-row"/>
		</xsl:for-each>
	</div>
</xsl:template>


<xsl:template name="layers-list-row">
	<xsl:choose>
		<xsl:when test="@type = 'group'">
			<div>
				<xsl:attribute name="class">group 
					<xsl:if test="@expanded = 1">expanded </xsl:if>
					<xsl:if test="@hidden = 1">hidden </xsl:if>
					<xsl:if test="count(./i) = 0">empty </xsl:if>
				</xsl:attribute>
				<div class="row" data-layer="folder">
					<div class="layer-row-body">
						<xsl:attribute name="data-id"><xsl:value-of select="@id"/></xsl:attribute>
						<div class="icon icon-folder"></div>
						<xsl:if test="@mask">
							<i class="icon-mask-link"></i>
							<div class="mask"><canvas></canvas></div>
						</xsl:if>
						<div class="name"><xsl:value-of select="@name"/></div>
						<i data-click="toggle-layer-visibility">
							<xsl:attribute name="class">icon icon-eye-on 
								<xsl:if test="@hidden = 1">icon-eye-off</xsl:if>
							</xsl:attribute>
						</i>
						<xsl:if test="count(./fx)"><xsl:call-template name="layer-row-fx"/></xsl:if>
					</div>
				</div>
				<xsl:for-each select="./i">
					<xsl:call-template name="layers-list-row"/>
				</xsl:for-each>
			</div>
		</xsl:when>

		<xsl:otherwise>
			<div>
				<xsl:attribute name="data-layer"><xsl:value-of select="@type"/></xsl:attribute>
				<xsl:if test="@target">
					<xsl:attribute name="data-target"><xsl:value-of select="@target"/></xsl:attribute>
				</xsl:if>
				<xsl:attribute name="class">row 
					<xsl:if test="@fx-expanded = 1">fx-expand </xsl:if>
				</xsl:attribute>
				<xsl:attribute name="style">
					--w: <xsl:value-of select="@w"/>px;
					--h: <xsl:value-of select="@h"/>px;
				</xsl:attribute>
				<xsl:call-template name="layer-row-body"/>
				<xsl:if test="count(./fx)"><xsl:call-template name="layer-row-fx"/></xsl:if>
			</div>
		</xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template name="layer-row-body">
	<div class="layer-row-body">
		<xsl:attribute name="data-id"><xsl:value-of select="@id"/></xsl:attribute>
		<xsl:if test="@clip"><i class="icon icon-clipping-mask"></i></xsl:if>
		<div class="thumbnail"><canvas></canvas><i></i></div>
		<xsl:if test="@mask">
			<i class="icon-mask-link"></i>
			<div class="mask"><canvas></canvas></div>
		</xsl:if>
		<div class="name"><xsl:value-of select="@name"/></div>
		<i data-click="toggle-layer-visibility">
			<xsl:attribute name="class">icon icon-eye-on 
				<xsl:if test="@hidden = 1">icon-eye-off</xsl:if>
			</xsl:attribute>
		</i>
	</div>
</xsl:template>


<xsl:template name="layer-row-fx">
	<xsl:if test="count(./fx)">
		<div class="fx-applied"></div>
		<ul>
			<xsl:attribute name="class">fx-list 
				<xsl:if test="@fx-enabled = 0">fx-disabled </xsl:if>
			</xsl:attribute>
			<li class="fx-header">
				<i data-click="toggle-fx-visibility">
					<xsl:attribute name="class">icon icon-eye-on 
						<xsl:if test="@fx-enabled = 0">icon-eye-off</xsl:if>
					</xsl:attribute>
				</i>
				<div class="fx-name">Effects</div>
			</li>
			<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="data-typeId"><xsl:value-of select="@typeId"/></xsl:attribute>
				<xsl:attribute name="data-multiKey"><xsl:value-of select="@multiKey"/></xsl:attribute>
				<xsl:attribute name="data-typeIndex"><xsl:value-of select="@typeIndex"/></xsl:attribute>
				<xsl:attribute name="data-instanceIndex"><xsl:value-of select="@instanceIndex"/></xsl:attribute>
				<i data-click="toggle-fx-visibility">
					<xsl:attribute name="class">icon icon-eye-on 
						<xsl:if test="@hidden = 1">icon-eye-off</xsl:if>
					</xsl:attribute>
				</i>
				<div class="fx-name"><xsl:value-of select="@name"/></div>
			</li>
			</xsl:for-each>
		</ul>
	</xsl:if>
</xsl:template>


<xsl:template name="preset-brush-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:attribute name="data-size"><xsl:value-of select="@size"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--br: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-brush-preset"></li>
	</ul>
</xsl:template>


<xsl:template name="preset-gradient-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--gr: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-gradient-preset"></li>
	</ul>
</xsl:template>


<xsl:template name="preset-pattern-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--pt: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-pattern-preset"></li>
	</ul>
</xsl:template>


<xsl:template name="preset-layer-style-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--ls: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-layer-style-preset"></li>
	</ul>
</xsl:template>


<xsl:template name="preset-shapes-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--sh: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-shapes-preset"></li>
	</ul>
</xsl:template>


<xsl:template name="preset-contour-list">
	<ul class="preset-list">
		<xsl:for-each select="./*">
			<li>
				<xsl:attribute name="title"><xsl:value-of select="@name"/></xsl:attribute>
				<xsl:if test="@hash"><xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute></xsl:if>
				<xsl:if test="@path"><xsl:attribute name="style">--co: url(~/cache/<xsl:value-of select="@path"/>);</xsl:attribute></xsl:if>
			</li>
		</xsl:for-each>
		<li class="add-new" data-click="add-contour-preset"></li>
	</ul>
</xsl:template>




<xsl:template name="layer-style-list">
	<xsl:for-each select="./*">
		<xsl:choose>
			<xsl:when test="@check = 0">
				<div class="option"><xsl:value-of select="@name"/></div>
			</xsl:when>
			<xsl:otherwise>
				<div>
					<xsl:attribute name="class">option check <xsl:value-of select="@class" /></xsl:attribute>
					<span class="value">
						<input type="checkbox">
							<xsl:attribute name="id">check-<xsl:value-of select="position()" /></xsl:attribute>
						</input>
						<i></i>
					</span>
					<label class="label">
						<xsl:attribute name="for">check-<xsl:value-of select="position()" /></xsl:attribute>
						<xsl:value-of select="@name"/>
					</label>
				</div>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>


<xsl:template name="filter-row">
	<div class="filter-row">
		<div class="filter-head">
			<span class="arrow" data-click="toggle-filter-row">
				<i class="icon-arrow"></i>
			</span>
			<span class="filter" data-filter="Colored Pencil" data-click="show-filter-options"></span>
			<span class="action-icons">
				<i class="icon-eye-on" data-click="toggle-filter"></i>
				<i class="icon-trashcan" data-click="remove-filter"></i>
			</span>
		</div>
		<div class="filter-body"></div>
	</div>
</xsl:template>


<xsl:template name="filter-gallery-list">
	<xsl:for-each select="./*">
		<fieldset>
			<legend><xsl:value-of select="@group"/></legend>
			<xsl:for-each select="./*">
				<div>
					<xsl:attribute name="data-filter"><xsl:value-of select="@name"/></xsl:attribute>
				</div>
			</xsl:for-each>
		</fieldset>
	</xsl:for-each>
</xsl:template>


<xsl:template name="filter-options">
	<xsl:for-each select="./*">
		<xsl:when test="@type = 'select'">
			<div class="field-row">
				<div class="option">
					<span class="label"><xsl:value-of select="@name" /></span>
					<span class="value"><xsl:value-of select="./*[@selected='1']/@name"/></span>
				</div>
			</div>
		</xsl:when>
		<xsl:when test="@type = 'checkbox'">
			<div class="field-row">
				<div class="option check">
					<span class="value">
						<input type="checkbox">
							<xsl:attribute name="id">check-<xsl:value-of select="position()" /></xsl:attribute>
							<xsl:if test="@checked = 'true'"><xsl:attribute name="checked">checked</xsl:attribute></xsl:if>
						</input>
						<i></i>
					</span>
					<label class="label">
						<xsl:attribute name="for">check-<xsl:value-of select="position()" /></xsl:attribute>
						<xsl:value-of select="@name" />
					</label>
				</div>
			</div>
		</xsl:when>
		<xsl:when test="@type = 'color'">
			<div class="field-row">
				<div class="option preset" data-change="set-color" data-options="swatches" data-match="//Swatches">
					<span class="label"><xsl:value-of select="@name" /></span>
					<span class="value" style="background: #eb261f;"></span>
				</div>
			</div>
		</xsl:when>
		<xsl:choose>
			<xsl:otherwise>
				<div class="field-row has-knob">
					<div class="option input">
						<span class="label"><xsl:value-of select="@name" /></span>
						<span class="value">
							<input type="number">
								<xsl:attribute name="name">field-<xsl:value-of select="position()" /></xsl:attribute>
								<xsl:attribute name="data-min"><xsl:value-of select="@min" /></xsl:attribute>
								<xsl:attribute name="data-max"><xsl:value-of select="@max" /></xsl:attribute>
								<xsl:attribute name="value"><xsl:value-of select="@value" /></xsl:attribute>
							</input>
						</span>
					</div>
					<div class="knob" data-change="set-filter-value">
						<xsl:attribute name="data-value"><xsl:value-of select="@value" /></xsl:attribute>
					</div>
				</div>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:for-each>
</xsl:template>


<xsl:template name="feather-modes">
	<div class="inline-menubox" data-ui="doSelectbox">
		<div class="inline-content">
			<xsl:for-each select="./*">
				<xsl:choose>
					<xsl:when test="@type = 'divider'"><hr/></xsl:when>
					<xsl:when test="@type = 'option'">
						<div class="option">
							<xsl:attribute name="data-value"><xsl:choose>
								<xsl:when test="@value"><xsl:value-of select="@value"/></xsl:when>
								<xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
							</xsl:choose></xsl:attribute>
							<xsl:value-of select="@name"/>
						</div>
					</xsl:when>
				</xsl:choose>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


<xsl:template name="pop-gradient-strips">
	<div class="inline-menubox" data-ui="doGradients">
		<div class="inline-content gradient-strips" data-click="select-gradient-strip">
			<xsl:for-each select="./*">
				<div class="strip">
					<xsl:if test="@active = 1"><xsl:attribute name="class">strip active</xsl:attribute></xsl:if>
					<xsl:attribute name="style">--gs: <xsl:value-of select="@g"/>;</xsl:attribute>
				</div>
			</xsl:for-each>
			<div class="add-strip" data-click="add-gradient-strip"></div>
		</div>
	</div>
</xsl:template>


<xsl:template name="pop-font-selector">
	<div class="inline-menubox" data-ui="doFontExplorer">
		<div class="inline-content font-explorer">
			<div class="selectors">

				<div class="fld-search">
					<input type="text" placeholder="Font name..."/>
				</div>
				<div class="fld-options">
					<ul class="opt-group">
						<li data-ux="toggle-filter" data-arg="16" class="active"><i class="icon icon-font-serif" title="Serif"></i></li>
						<li data-ux="toggle-filter" data-arg="14" class="active"><i class="icon icon-font-sans-serif" title="Sans-serif"></i></li>
						<li data-ux="toggle-filter" data-arg="9" class="active"><i class="icon icon-font-monospace" title="Monospace"></i></li>
						<li data-ux="toggle-filter" data-arg="1"><i class="icon icon-font-script" title="Script"></i></li>
					</ul>
				</div>
				<div class="fld-menu inline-menu" data-change="apply-filters" data-pos="right" data-options="fieldset-inline-menubox" data-match="//FontsExtendedMenu">
					<i class="icon icon-burger"></i>
				</div>

			</div>
			<div class="list">
				<div class="list-wrapper" data-click="select-font">
					<xsl:for-each select="./f">
						<xsl:call-template name="font-entry" />
					</xsl:for-each>
				</div>
			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="font-entry">
	<div>
		<xsl:attribute name="_id"><xsl:value-of select="@_id"/></xsl:attribute>
		<xsl:attribute name="style">--x: <xsl:value-of select="@x"/>; --y: <xsl:value-of select="@y"/>;</xsl:attribute>
		<xsl:value-of select="@name"/>
	</div>
</xsl:template>


<xsl:template name="pop-brush-tips">
	<div class="inline-menubox" data-ui="doBrushTips">
		<div class="inline-content brush-tips">
			<div class="tip-presets">
				<div class="rotation">
					<div class="gyro">
						<div class="handle"></div>
						<div class="handle"></div>
						<div class="direction"></div>
					</div>
				</div>
				<div class="ranges">
					<div class="tip-size">
						<span class="label">Size:</span>
						<span class="value" data-suffix="px">21px</span>
						<input type="range" data-change="tip-menu-set-size" class="mini-range" min="1" max="200" />
					</div>
					<div class="tip-hardness">
						<span class="label">Hardness:</span>
						<span class="value" data-suffix="%">81%</span>
						<input type="range" data-change="tip-menu-set-hardness" class="mini-range" min="0" max="100" />
					</div>
				</div>
			</div>
			<div class="shape-list">
				<xsl:for-each select="./*">
					<div data-click="tip-menu-set-tip">
						<xsl:attribute name="data-name">
							<xsl:value-of select="@name"/>
						</xsl:attribute>
						<xsl:attribute name="class">
							<xsl:if test="@type = 'texture'">texture</xsl:if>
							<xsl:if test="@tip = 'round'"> round</xsl:if>
						</xsl:attribute>
					</div>
				</xsl:for-each>
			</div>
			<div class="preview">
				<canvas></canvas>
			</div>
		</div>
	</div>
</xsl:template>


<xsl:template name="pixelator-preset">
	<xsl:for-each select="./*">
		<xsl:call-template name="pixelator-preset-layer" />
	</xsl:for-each>
</xsl:template>


<xsl:template name="pixelator-preset-layer">
	<xsl:variable name="shape"><xsl:choose>
		<xsl:when test="@shape"><xsl:value-of select="@shape"/></xsl:when>
		<xsl:otherwise>square</xsl:otherwise>
	</xsl:choose></xsl:variable>

	<xsl:variable name="alpha"><xsl:choose>
		<xsl:when test="@alpha"><xsl:value-of select="@alpha * 100"/></xsl:when>
		<xsl:otherwise>100</xsl:otherwise>
	</xsl:choose></xsl:variable>

	<div class="row">
		<div>
			<div class="shape-options" data-click="set-layer-shape">
				<i class="icon-shape-square"><xsl:if test="$shape = 'square'">
					<xsl:attribute name="class">icon-shape-square active</xsl:attribute>
				</xsl:if></i>
				<i class="icon-shape-diamond"><xsl:if test="$shape = 'diamond'">
					<xsl:attribute name="class">icon-shape-diamond active</xsl:attribute>
				</xsl:if></i>
				<i class="icon-shape-circle"><xsl:if test="$shape = 'circle'">
					<xsl:attribute name="class">icon-shape-circle active</xsl:attribute>
				</xsl:if></i>
			</div>
		</div>
		<div data-ux="dlg-knob" data-change="set-spacing" data-min="0" data-max="64" data-suffix="px"><xsl:value-of select="@res"/> <xsl:if test="@res">px</xsl:if></div>
		<div data-ux="dlg-knob" data-change="set-size" data-min="0" data-max="64" data-suffix="px"><xsl:value-of select="@size"/> <xsl:if test="@size">px</xsl:if></div>
		<div data-ux="dlg-knob" data-change="set-offset" data-min="0" data-max="64" data-suffix="px"><xsl:value-of select="@offset"/> <xsl:if test="@offset">px</xsl:if></div>
		<div>
			<i class="icon-bars" data-ux="dlg-bars" data-change="set-opacity">
				<xsl:attribute name="style">--value: <xsl:value-of select="$alpha"/>%;</xsl:attribute>
			</i>
			<i class="icon-eye-on" data-click="toggle-layer"><xsl:if test="@hidden = 1">
				<xsl:attribute name="class">icon-eye-on icon-eye-off</xsl:attribute>
			</xsl:if></i>
			<i class="icon-trashcan" data-click="remove-layer"></i>
		</div>
	</div>
</xsl:template>


<xsl:template name="substring-after-last">
	<xsl:param name="string" />
	<xsl:param name="delimiter" />
	<xsl:choose>
		<xsl:when test="contains($string, $delimiter)">
			<xsl:call-template name="substring-after-last">
				<xsl:with-param name="string" select="substring-after($string, $delimiter)" />
				<xsl:with-param name="delimiter" select="$delimiter" />
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise><xsl:value-of select="$string" /></xsl:otherwise>
	</xsl:choose>
</xsl:template>


<xsl:template name="statusbar-tab">
	<div class="file" data-click="select-file">
		<xsl:attribute name="data-arg"><xsl:value-of select="@id"/></xsl:attribute>
		<span><xsl:value-of select="@name"/></span>
		<div class="close" data-click="close-file"></div>
	</div>
</xsl:template>


<xsl:template name="knob">
	<div class="inline-menubox" data-ui="doKnob">
		<div class="inline-content">
			<div class="knob"></div>
		</div>
	</div>
</xsl:template>


<xsl:template name="contours">
	<div class="inline-menubox" data-ui="doContours">
		<div class="inline-content contours">
			<xsl:for-each select="./*">
				<div class="contour">
					<xsl:attribute name="data-hash"><xsl:value-of select="@hash"/></xsl:attribute>
				</div>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


<xsl:template name="patterns">
	<div class="inline-menubox" data-ui="doPatterns">
		<div class="inline-content patterns">
			<xsl:for-each select="./*">
				<div class="pattern">
					<xsl:attribute name="data-name"><xsl:value-of select="@name"/></xsl:attribute>
				</div>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


<xsl:template name="swatches">
	<div class="inline-menubox" data-ui="doSwatches">
		<div class="inline-content swatches">
			<xsl:for-each select="./*">
				<div class="swatch">
					<xsl:attribute name="style">background: <xsl:value-of select="@value"/>;</xsl:attribute>
				</div>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


<xsl:template name="fieldset-inline-menubox">
	<div class="inline-menubox" data-ui="doSelectbox">
		<xsl:if test="@select = 'multi'">
			<xsl:attribute name="data-select">multi</xsl:attribute>
		</xsl:if>
		<div class="inline-content">
			<xsl:for-each select="./*">
				<xsl:choose>
					<xsl:when test="@type = 'divider'"><hr/></xsl:when>
					<xsl:when test="@type = 'option'">
						<div>
							<xsl:attribute name="class">option 
								<xsl:if test="@is-checked = 1">selected</xsl:if>
							</xsl:attribute>
							<xsl:if test="@icon"><i><xsl:attribute name="class">icon <xsl:value-of select="@icon"/></xsl:attribute></i></xsl:if>
							<xsl:if test="@click">
								<xsl:attribute name="data-click"><xsl:value-of select="@click"/></xsl:attribute>
							</xsl:if>
							<xsl:attribute name="data-value"><xsl:choose>
								<xsl:when test="@id"><xsl:value-of select="@id"/></xsl:when>
								<xsl:when test="@arg"><xsl:value-of select="@arg"/></xsl:when>
								<xsl:when test="@value"><xsl:value-of select="@value"/></xsl:when>
								<xsl:otherwise><xsl:value-of select="@name"/></xsl:otherwise>
							</xsl:choose></xsl:attribute>
							<xsl:value-of select="@name"/>
						</div>
					</xsl:when>
				</xsl:choose>
			</xsl:for-each>
		</div>
	</div>
</xsl:template>


</xsl:stylesheet>