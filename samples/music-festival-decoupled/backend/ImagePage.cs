using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;

[ContentType(GUID = "ef6bf538-025e-4981-af47-065c754c145b")]
[MediaDescriptor(ExtensionString = "jpg,jpeg,jpe,ico,gif,bmp,png")]
public class ImagePage : ImageData
{
    /// <summary>
    /// Gets or sets the copyright.
    /// </summary>
    /// <value>
    /// The copyright.
    /// </value>
    public virtual string Copyright { get; set; }
}